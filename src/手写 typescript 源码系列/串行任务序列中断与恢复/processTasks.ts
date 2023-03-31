/**
 * 依次顺序执行一系列任务
 * 所有任务全部完成后可以得到每个任务的执行结果
 * 需要返回两个方法，start 用于启动任务执行，pause 用于暂停任务执行，
 * 而且 start 返回一个 promise, 当所有任务都成功时完成，当其中一个任务失败时失败
 * 每个任务具有原子性，即不可中断，只能在两个任务之间中断
 * @param tasks 需要串行执行的任务序列，每个任务无参且异步
 * 场景：大文件分片上传
 */
export function processTasks(...tasks: any[]) {
  let isRunning = false;
  // 任务结果
  const result: any[] = [];
  let i = 0; // 将执行的任务的下标
  const taskCount = tasks.length;
  let prom: Promise<any> | null = null;
  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (prom) {
          // 已经结束
          prom.then(resolve, reject);
          return;
        }
        isRunning = true;
        while (i < taskCount) {
          try {
            result.push(await tasks[i]());
          } catch (err) {
            // 其中一个任务失败
            prom = Promise.reject(err);
            isRunning = false;
            return;
          }
          i = i + 1;
          // 非最后一个任务执行结束被中断
          if (!isRunning && i < taskCount - 1) {
            return;
          }
        }
        // 所有任务都成功
        resolve(result);
        isRunning = false;
        prom = Promise.resolve(result);
      });
    },
    pause() {
      isRunning = false;
    },
  };
}

// 顺序执行多个任务
// 1. 利用 Promise 单纯的顺序执行任务
// tasks.reduce((acc, task) => {
//   acc.then((val: any) => {
//     result.push(val);
//     return task();
//   })
// })
