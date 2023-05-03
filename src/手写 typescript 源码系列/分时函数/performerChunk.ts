type HasTimeFn = (time?: number) => boolean;
type Task = (hasTime: HasTimeFn) => void;
/**
 * 分时的在空闲的时候执行长任务
 * @param data 数据列表或次数
 * @param consumer 消费数据的函数或需要多次执行的任务函数
 * @param chunkSplitor 任务分割器，默认使用 requestIdleCallback
 * @example
 *  const consumer =
 *  performChunk(10, (item, next) => {
 *    // do something;
 *  }, (task) => {
 *    setTimeout(() => {
 *      task((time) => time > 16);
 *    }, 30)
 *  })
 *  performChunk(10, (item, next) => {
 *    // do something;
 *  })
 */
function performChunk(
  data: any[] | number,
  consumer: (value: any, next: number) => void,
  chunkSplitor: (task: Task) => void
) {
  if (typeof data === 'number') {
    data = new Array(data);
  }
  const count = data.length;
  if (count === 0) {
    return;
  }
  // @ts-ignore
  if (!chunkSplitor && globalThis.requestIdleCallback) {
    chunkSplitor = (task) => {
      globalThis.requestIdleCallback((idle) => {
        task(() => idle.timeRemaining() > 0);
      });
    };
  }
  let next = 0; // 应该取出的任务下标
  function _run() {
    if (next >= count) {
      return;
    }
    chunkSplitor((hasTime: HasTimeFn) => {
      const now = Date.now();
      while (hasTime(Date.now() - now) && next < count) {
        // 当前帧存在空闲时间
        const item = (data as any[])[next];
        consumer(item, next);
        next = next + 1;
      }
    });
    _run();
  }

  _run();
}
