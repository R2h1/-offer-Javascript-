// 1. 普通函数重载
message({
  mode: 'mode',
  text: 'text',
  onClose: function () {},
  duration: 3000,
});
message('text');
message('text', function () {});
message('text', 'mode');
message('text', 'mode', 3000);
message('text', 3000);
message('text', 3000, function () {});

// 函数重载声明
function message(options: object): void;
function message(text: string, mode: string, duration?: number): void;
function message(text: string, onClose?: Function): void;
function message(text: string, duration?: number, onClose?: Function): void;
// 最后一个必须是函数实现
function message(params1: string | object, params2?: string | number | Function, params3?: number | Function) {
  // 实现细节
}

// 2. 普通对象的方法重载
interface MethodOverload {
  (options: object): void;
  (text: string): void;
}

interface Utils {
  //...
  showMessage: MethodOverload;
}

const utils: Utils = {
  showMessage(options: object | string) {},
};

// 3. 方法重载
class Example1 {
  // ...
  showMessage(options: object): void;
  showMessage(text: string): void;
  showMessage(options: object | string) {}
}

// 4 构造器重载
class Example2 {
  constructor(name: string, age: number);
  constructor(info: object);
  constructor(params1: string | object, params2?: number) {}
}

export { message, utils, Example1, Example2 };
