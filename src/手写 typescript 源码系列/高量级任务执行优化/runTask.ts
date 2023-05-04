/**
 * 运行一个耗时任务
 * 如果要异步执行任务，请返回Promise
 * 会同时执行 1000 个runTask, 要尽快执行每个任务，同时不要让页面产生卡顿
 * 尽量兼容更多的浏览器
 * @param {Function} task 一个耗时的任务
 *
 */
function runTask(task: Function) {
  return new Promise((resolve) => {
    _run(task, resolve);
  });
}

const _run = (function () {
  // @ts-ignore
  if (globalThis.requestIdleCallback) {
    return function (task: Function, resolve: Function) {
      globalThis.requestIdleCallback((idle) => {
        if (idle.timeRemaining() > 0) {
          task();
          resolve();
          return;
        }
        _run(task, resolve);
      });
    };
  }
  return function (task: Function, resolve: Function) {
    const start = Date.now();
    globalThis.requestAnimationFrame(() => {
      if (Date.now() - start < 16) {
        task();
        resolve();
        return;
      }
      _run(task, resolve);
    });
  };
})();
