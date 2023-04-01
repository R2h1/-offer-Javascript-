/**
 * 并发任务控制
 */

type TaskInfo = {
  task: () => Promise<any>;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
};

class SuperTask {
  readonly tasks: TaskInfo[];
  private runningCount: number;
  // 相当于 this.concurrentCount = concurrentCount // 并发数量
  constructor(public readonly concurrentCount = 2) {
    this.runningCount = 0; // 正在执行的任务数量
    this.tasks = [];
  }
  add(task: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }
  // 依次执行队列中的所有任务，且每个时刻只能有 n 个任务执行
  private run() {
    while (this.runningCount < this.concurrentCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift() as TaskInfo;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount = this.runningCount - 1;
        });
      this.run();
    }
  }
}

// 示例

interface RequestData {
  message: string;
}

function timeout(data: RequestData, time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.message);
    }, time);
  });
}

// todo 实现并发任务控制，同一时刻只能有 n 个任务执行
const superTask = new SuperTask(2);

function addTask(time: number, name: string) {
  superTask
    .add(() => timeout({ message: name }, time))
    .then((value: any) => {
      console.log(`任务 ${name} 完成, 结果为: `, value);
    });
}

addTask(10000, '1'); // 10s 后输出 任务 1 完成, 结果为: 1
addTask(5000, '2'); // 5s 后输出 任务 3 完成, 结果为: 2
addTask(3000, '3'); // 8s 后输出 任务 3 完成, 结果为: 3
addTask(4000, '4'); // 12s 后输出 任务 4 完成, 结果为: 4
addTask(5000, '5'); // 15s 后输出 任务 5 完成, 结果为: 5
