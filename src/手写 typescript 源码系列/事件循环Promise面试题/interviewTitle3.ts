let promA: Promise<any>;
const promB = new Promise((resolve) => {
  console.log('promise1');
  setTimeout(() => {
    resolve(undefined);
  }, 1000);
})
  .then(() => {
    console.log('promise2');
  })
  .then(() => {
    console.log('promise3');
  })
  .then(() => {
    console.log('promise4');
  });

promA = new Promise(async (resolve) => {
  console.log(promA);
  await promB;
  /**
     * 相当于promB.then((res) => {
        console.log(promB);
        console.log('after1');
        await promA;
        resolve(true);
        console.log('after2');
      })
     */
  console.log(promA);
  console.log('after1');
  await promA;
  resolve(true);
  console.log('after2');
});

console.log('end');

/**
 * 1. 首先执行同步代码, 产生以下 promise:
 *    newProm1: pending（先立即输出 promise1，1秒后 newProm1 才 resolve)
 *    newProm1.then: pending
 *    newProm1.then.then: pending
 *    newProm1.then.then.then: pending, 即 promB，
 *    因为右侧表达式 then 本身是同步执行（then的回调是等调用 then 的 promise 状态转变才放入微队列而已），
 *    因此变量 promB 能确定为 newProm1.then.then.then 返回的 Promise
 *
 *    newProm2: pending (立即输出变量 promA, 此时为 undefined，因为右侧表达式此刻未执行完毕，然后等待 promB，后续代码需等待 promB 状态改变才执行，但参数 executor 执行完毕，变量 promA 此刻确定为 newProm2）
 *
 *    输出 end;
 * 2. 1 秒后 newProm1 resolve，将 "newProm1.then 的回调" 放入微队列：["newProm1.then 的回调"]
 *
 * 3. 取微队列任务 "newProm1.then 的回调" 执行， 输出 promise2, 将 "newProm1.then.then 的回调" 放入微队列：["newProm1.then.then 的回调"]
 *
 * 4. 取微队列任务 "newProm1.then.then 的回调" 执行， 输出 promise3, 将 "newProm1.then.then.then 的回调" 放入微队列：["newProm1.then.then.then 的回调"]
 *
 * 5. 取微队列任务 "newProm1.then.then.then 的回调" 执行， 输出 promise4, promB状态变成 fulfilled， 将 "await PromB 后面的代码" 放入微队列中: ["await PromB 后面的代码"]
 *
 * 6. 取微队列任务 "await PromB 后面的代码" 执行， 输出 promA 即 newProm2: { pending }, 然后输出 after1，然后 await promA; 即 await newProm2;
 *
 * 7. 由于 newProm2 等待自己完成后才完成自己，所以 newProm2 即 promA 会一直 pending。await promA; 后面的代码无效不会执行。
 */

/**
 * 输出结果：
 *  promise1
 *  undefined
 *  end
 *  promise2
 *  promise3
 *  promise4
 *  Promise: { pending }
 *  after1
 */
