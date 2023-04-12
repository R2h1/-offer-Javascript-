/**
 * 实现一个 arrange 函数
 *   Arrange('William').execute();
 *   > William is notified
 *   Arrange('William').do('commit').execute()
 *   > William is notified
 *   > Start to commit
 *   Arrange('William').wait(5).do('commit').execute()
 *   > William is notified
 *   > 等待5秒
 *   > start to commit
 *   Arrange('William').waitFirst(5).do('push').execute()
 *   > 等待5秒
 *   > William is notified
 *   > Start to push
 */
type ArrangeType = {
  tasks: (() => void | Promise<any>)[];
  do(thing: string): ArrangeType;
  wait(duration: number): ArrangeType;
  waitFirst(duration: number): ArrangeType;
  execute(): Promise<void>;
};

function Arrange(this: ArrangeType, taskId: string) {
  this.tasks = [
    () => {
      console.log(`${taskId} is notified`);
    },
  ];
}

Arrange.prototype = {
  constructor: Arrange,
  do(thing: string) {
    this.tasks.push(() => console.log(`Start to ${thing}`));
    return this;
  },
  wait(duration: number) {
    this.tasks.push(() => {
      return new Promise((resolve) => {
        console.log(`等待 ${duration}s`);
        setTimeout(resolve, duration * 1000);
      });
    });
    return this;
  },
  waitFirst(duration: number) {
    this.queue.unshift(() => {
      return new Promise((resolve) => {
        console.log(`等待 ${duration}s`);
        setTimeout(resolve, duration * 1000);
      });
    });
    return this;
  },
  async execute() {
    for (let task of this.tasks) {
      await task();
    }
  },
};
