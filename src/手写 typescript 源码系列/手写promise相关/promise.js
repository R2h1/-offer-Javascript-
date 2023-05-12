import { isIterable, isPromise } from '../../../utils';
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 将函数 callback 放入微队列中执行
 */
const runMicroTask = (() => {
  if (process && typeof process.nextTick === 'function') {
    return (callback) => {
      process.nextTick(callback);
    };
  } else if (MutationObserver) {
    return (callback) => {
      const mob = new MutationObserver(() => {
        callback();
        mob.disconnect();
      });
      // 创建一个文本节点
      const textNode = document.createTextNode('0');
      // 监听文本节点的 data
      mob.observe(textNode, {
        characterData: true,
      });
      // 修改文本节点 data 触发回调
      textNode.data = '1';
    };
  } else {
    return (callback) => {
      setTimeout(callback);
    };
  }
})();

class MyPromise {
  /**
   * 接收一个会立即执行的处理器函数
   * @param {Function} executor
   */
  constructor(executor) {
    this.state = PENDING;
    this.result = undefined;
    // 一个 MyPromise 可以重复多次调用 then 方法
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const changeState = (newState, value, callbacks) => {
      if (this.state !== PENDING) return;
      this.state = newState;
      this.result = value;
      // onFulfilled 或 onRejected 回调按原始放入顺序依次执行
      callbacks.forEach((callback) => callback());
    };

    const resolve = (value) => {
      changeState(FULFILLED, value, this.onResolvedCallbacks);
    };

    const reject = (reason) => {
      changeState(REJECTED, reason, this.onRejectedCallbacks);
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  /**
   * 立即返回一个新的处理中 pending 的Promise，与调用 then 方法的原 Promise 的状态无关，而是取决于 onFulfilled 或 onRejected 处理函数的执行结果
   * @param {Function} onFulfilled 当原Promise变成已完成状态（fulfilled）执行的函数，唯一参数是已完成的最终结果（the fulfillment value），如果onFulfilled不是函数（包括undefined），则会在内部被替换为 (x) => x（即原样返回原 Promise 已完成的最终结果的函数）
   * @param {Function} onRejected 当 Promise 变成拒绝状态（rejected）时调用的函数。唯一参数是拒绝的原因（rejection reason）。如果onRejected不是函数（包括undefined），则会在内部被替换为一个 "Thrower" 函数 (err) => { throw err; }。
   * @returns
   */
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      const handler = (onSettled, run, resolve, reject) => {
        run(() => {
          try {
            // 原 Promise 的结果作为 onSettled 的参数，返回 x 若是 Promise 则运行 Promise 的解决过程
            const x = onSettled(this.result);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            // 如果 onSettled 异常，则 promise2 拒绝执行，并返回拒绝原因
            reject(err);
          }
        });
      };

      // 如果原 Promise 已完成，异步执行 onFulfilled
      if (this.state === FULFILLED) {
        handler(onFulfilled, runMicroTask, resolve, reject);
      }
      // 如果原 Promise 已拒绝，异步执行 onRejected
      if (this.state === REJECTED) {
        handler(onRejected, runMicroTask, resolve, reject);
      }
      // 如果原 Promise 处于 pending 中，将 onSettled 加入对应的回调队列中，等原 Promise 状态改变后，按顺序将对应对应队列中的回调放入微队列中执行
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          handler(onFulfilled, runMicroTask, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          handler(onRejected, runMicroTask, resolve, reject);
        });
      }
    });
    return promise2;
  }

  //catch 方法是then(null, reject)的语法糖
  catch(fn) {
    return this.then(null, fn);
  }

  // finally 方法 ,无论如何都会执行并原封不动向下传
  finally(fn) {
    return this.then(
      (value) => {
        MyPromise.resolve(fn()).then(() => value);
      },
      (reason) => {
        MyPromise.resolve(fn()).then(() => {
          throw reason;
        });
      }
    );
  }
}

// Promise 的解决过程
const resolvePromise = (promise2, x, resolve, reject) => {
  if (x === promise2) {
    return reject(new TypeError('chaining cycle detected for promise'));
  }
  let isCalled = false;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then;
      // 如果 then 是函数, x 调用它
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (isCalled) return;
            isCalled = true;
            resolvePromise(promise2, y, resolve, reject); // 递归调用
          },
          (err) => {
            if (isCalled) return;
            isCalled = true;
            reject(err);
          }
        );
      } else {
        // 如果 then 不是函数，x 作为参数执行 resolve
        resolve(x);
      }
    } catch (error) {
      if (isCalled) return;
      isCalled = true;
      // 如果 x.then 执行报错，以 error 为拒因拒绝 promise
      reject(error);
    }
  } else {
    // 如果 x 不是函数或对象，x 作为参数执行 resolve
    resolve(x);
  }
};

//接受thenable对象参数
Promise.resolve = (promises) => {
  if (promises instanceof Promise) {
    return promises;
  }
  return new Promise((resolve, reject) => {
    // 如果具有then方法,异步执行then方法
    if (promises && promises.then && typeof promises.then === 'function') {
      setTimeout(() => {
        promises.then(resolve, reject);
      });
    } else {
      // promises作为参数执行resolve
      resolve(promises);
    }
  });
};

//无论是否有then方法，都是reason作为参数执行reject，并原封不动向下传
MyPromise.reject = (reason) => new MyPromise((resolve, reject) => reject(reason));

/**
 * 1. 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise。
 * 2. 如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved） Promise, 即也是先 pending；chrome 58这种情况是和 1 同。
 * 3. 其它情况下返回一个 pending 的Promise。这个返回的 promise 之后会在所有的 promise 都完成时异步地变为完成或只要有一个 promise 失败时异步地变为失败。返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
 * @param iterable 一个可迭代对象，如 Array 或 String。
 * @returns
 */
MyPromise.all = (iterable) => {
  return new MyPromise((resolve, reject) => {
    try {
      // 判断是否是可迭代对象
      if (!isIterable(iterable)) {
        throw new TypeError(`${typeof iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`);
      }
      iterable = Array.from(iterable);
      // 1. 空的可迭代对象，返回一个同步已完成的 Promise
      if (iterable.length === 0) {
        resolve([]);
        return;
      }
      // 其余情况，包括 2. 3.
      const resolvedValues = [];
      let resolvedNum = 0;
      for (let [index, iter] of iterable.entries()) {
        MyPromise.resolve(iter)
          .then((value) => {
            resolvedNum = resolvedNum + 1;
            resolvedValues[index] = value;
            if (resolvedNum === promiseNum) {
              resolve(resolvedValues);
            }
          })
          .catch((err) => reject(err)); // catch 可以捕获在 then 回调中的错误
      }
    } catch (err) {
      reject(err);
    }
    // 利用 reduce
    // promises.reduce((acc, cur, idx) => {
    //   MyPromise.resolve(cur)
    //     .then((value) => {
    //       resolvedNum = resolvedNum + 1;
    //       acc[idx] = value;
    //       if (resolvedNum === promiseNum) {
    //         resolve(acc)
    //       }
    //     })
    //     .catch((err) => reject(err));
    // }, []);
  });
};

MyPromise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    try {
      if (!isIterable(iterable)) {
        throw new TypeError(`${typeof iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`);
      }
      // 迭代 iterable
      for (let value of iterable) {
        if (value instanceof MyPromise) {
          value.then(resolve, reject);
        } else {
          resolve(value);
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * 请求并发控制
 * @param {*} requestPool 请求池 (是一个可迭代对象)
 * @param {*} poolLimit 最大并发数
 */
export async function concurrencyControlES7(requestPool, poolLimit) {
  /** 用于请求的结果 */
  const ret = [];
  /** 真正并发执行的请求集合 */
  const executing = new Set();
  for (const item of requestPool) {
    /** 防止返回的不是promise，使用Promise.resolve */
    const p = Promise.resolve().then(() => item());
    /** 将正在请求的promise放入ret和executing中 */
    ret.push(p);
    executing.add(p);
    /** 请求resolve 或 reject 执行 清除操作  */
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    if (executing.size >= poolLimit) {
      // 一旦正在执行的promise列表数量等于限制数，就使用Promise.race等待某一个promise状态发生变更，
      // 状态变更后，就会执行上面then的回调，将该promise从executing中删除，
      // 然后再进入到下一次for循环，生成新的promise进行补充
      await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}
/**
 * 请求并发控制
 * @param {*} requestPool 请求池 (是一个可迭代对象)
 * @param {*} poolLimit 最大并发数
 */
export function concurrencyControlES6(requestPool, poolLimit) {
  let i = 0;
  const ret = [];
  const executing = new Set();
  const enqueue = function () {
    if (i === requestPool.length) {
      return Promise.resolve();
    }
    const item = iterable[i++];
    const p = Promise.resolve().then(() => item());
    ret.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    let r = Promise.resolve();
    if (executing.size >= poolLimit) {
      r = Promise.race(executing);
    }
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}

module.export = MyPromise;
