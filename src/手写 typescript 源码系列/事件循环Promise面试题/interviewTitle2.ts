/**
 * A+ 规范：promise1.then 方法返回一个新的 promise2，如果 promise1.then 方法所执行的回调函数中也成功返回了一个 promise3，则 promise2 的状态则和 promise3 的状态保持一致
 * v8 中是通过 promise3.then 方法 传入 promise2 的 resolve，reject 来使得 promise2 的状态则和 promise3 的状态保持一致
 * V8 的实现是通过 promise3.then(resolve2, reject2) 且 promise3.then(resolve2, reject2) 是被放入微队列中
 */
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
/**
 * 1. 首先执行同步代码产生以下 Promise
 *     Pres1: fulfilled
 *     Pres1.then: pending
 *     Pres1.then.then: pending
 *     Pres2: fulfilled
 *     Pres2.then: pending
 *     Pres2.then.then: pending
 *     Pres2.then.then: pending
 *     Pres2.then.then.then.then: pending
 *     Pres2.then.then.then.then.then: pending
 *   微队列：["Pres1.then 的回调", "Pres2.then 回调"]
 *
 * 2. 同步代码执行完后，开始消费队列，首先执行 "Pres1.then 的回调" 输出 0，由于" Pres1.then 的回调"返回一个Promise, 记作 Pres3: fulfilled，
 *    因此将 Pres3.then(Pres1.then的resolve, Pres1.then的reject) 放入微队列
 *    微队列：["Pres2.then 回调", "Pres3.then(Pres1.then的resolve, Pres1.then的reject)"]
 *
 * 3. 继续取下一个微队列任务 "Pres2.then 回调" 执行，输出 1，
 *    由于 "Pres2.then 回调" 返回 普通 value（包括 undefined） Pres2.then 状态变成 fulfilled，将 "Pres2.then.then 回调" 放入微队列
 *    微队列：[Pres3.then(Pres1.then的resolve, Pres1.then的reject),  "Pres2.then.then 回调"]
 *
 * 4. 继续取下一个微队列任务 "Pres3.then(Pres1.then的resolve, Pres1.then的reject)" 执行，就是将 "Pres1.then的resolve" 放入微队列
 *    微队列：["Pres2.then.then 回调", "Pres1.then的resolve" ]
 *
 * 5. 继续取下一个微队列任务 "Pres2.then.then 回调" 执行, 输出 2, 将 "Pres2.then.then.then 回调" 放入微队列
 *    微队列：["Pres1.then的resolve", "Pres2.then.then.then 回调"]
 *
 * 6. 继续取下一个微队列任务 "Pres1.then的resolve" 执行, Pres1.then 状态变成 fulfilled, 将 "Pres1.then.then 回调" 放入微队列
 *    微队列：["Pres2.then.then.then 回调", "Pres1.then.then 回调"]
 *
 * 7. 继续取下一个微队列任务 "Pres2.then.then.then 回调" 执行, 输出 3, 将 "Pres2.then.then.then.then 回调" 放入微队列
 *    微队列：["Pres1.then.then 回调", "Pres2.then.then.then.then 回调"]
 *
 * 8. 继续取下一个微队列任务 "Pres1.then.then 回调" 执行, 输出 4
 *    微队列：["Pres2.then.then.then.then 回调"]
 *
 * 9. 继续取下一个微队列任务 "Pres2.then.then.then.then 回调" 执行, 输出 5, 将 "Pres2.then.then.then.then.then 回调" 放入微队列
 *    微队列：["Pres2.then.then.then.then.then 回调"]
 *
 * 10. 继续取下一个微队列任务 "Pres2.then.then.then.then.then 回调" 执行, 输出 6
 */

// 输出结果 0 1 2 3 4 5 6
