const calculator: AnyObject = {
  count: 0,
  next() {
    return (this.count = this.count + 1);
  },
  double(a: number) {
    return a * 2;
  },
  add(a: number, b: number) {
    return a + b;
  },
};

// 在不改动上述代码的情况下，实现调用函数时进行日志记录
for (const key in calculator) {
  const origin = calculator[key];
  if (typeof origin === 'function') {
    calculator[key] = function (...args: any[]) {
      console.log('开始调用${key}函数');
      origin.call(this, ...args);
      console.log('调用${key}函数结束');
    };
  }
}
