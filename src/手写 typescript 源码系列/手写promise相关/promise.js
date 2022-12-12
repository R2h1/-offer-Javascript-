import { isIterable } from '../../../utils';
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// Promise接收一个会立即执行的处理器函数
class MyPromise {
  constructor(executor) {
    // 初始化状态 为pending
    this.state = PENDING;
    //成功的值
    this.value = undefined;
    //失败的原因
    this.reason = undefined;
    // 一个MyPromise绑定多个then,可多次调用
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      //只有pending可转为其他状态
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        // onFufilled 回调按原始顺序依次执行
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // then方法
  then(onFullfilled, onRejected) {
    // onFullfilled, onRejected都是可选参数，且不是函数则必须忽略
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    // 链式调用，then方法返回新的MyPromise实例
    const promise2 = new MyPromise((resolve, reject) => {
      // 状态为成功完成才可调用onFulfild,且是异步调用(setTimeout模拟)
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            // vulue作为onFulfilled的参数，返回x若是promise 则运行promise的解决过程
            const x = onFullfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            // 如果onFullfilled异常，promise2拒绝执行，并返回拒绝原因
            reject(err);
          }
        });
      }

      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            // vulue作为onFulfilled的参数，返回x若是promise 则运行promise的解决过程
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            // 如果onRejected异常，promise2拒绝执行，并返回拒绝原因
            reject(err);
          }
        });
      }
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              // vulue作为onFulfilled的参数，返回x若是promise 则运行promise的解决过程
              const x = onFullfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              // 如果onFullfilled异常，promise2拒绝执行，并返回拒绝原因
              reject(err);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              // value作为onFulfilled的参数，返回x若是promise 则运行promise的解决过程
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              // 如果onRejected异常，promise2拒绝执行，并返回拒绝原因
              reject(err);
            }
          });
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

const resolvePromise = (promise2, x, resolve, reject) => {
  if (x === promise2) {
    return reject(new TyperError('chaining cycle detected for promise'));
  }

  let isCalled = false;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then;
      //如果 then是函数 x调用它
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (isCalled) return;
            isCalled = true;
            resolutionPromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (isCalled) return;
            isCalled = true;
            reject(err);
          }
        );
      } else {
        // 如果then不是函数，x作为参数执行resolve
        resolve(x);
      }
    } catch (err) {
      if (isCalled) return;
      isCalled = true;
      //如果x.then报错，以err为拒因拒绝promise
      reject(err);
    }
  } else {
    //若果 x 不是函数 或对象，x作为参数执行resolve
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
async function concurrencyControlES7(requestPool, poolLimit) {
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
function concurrencyControlES6(requestPool, poolLimit) {
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
