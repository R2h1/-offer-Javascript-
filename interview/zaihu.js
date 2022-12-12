function Action(name) {
  this.name = name;
  this.queue = [() => console.log(`start ${this.name}`)];

}

Action.prototype = {
  constructor: Action,
  do(action) {
    this.queue.push(() => console.log(`${this.name} ${action}`));
    return this;
  },
  wait(delay) {
    this.queue.push(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => console.log(`wait ${delay}s`))
        }, delay * 1000);
      })
    });
    return this;
  },
  waitFirst(delay) {
    this.queue.unshift(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => console.log(`wait ${delay}s`))
        }, delay * 1000);
      })
    });
    return this;
  },
  async execute() {
    for (let i = 0; i < this.queue.length; i++) {
      await this.queue[i]();
    }
  }
}

function machine(name) {
  return new Action(name);
}

