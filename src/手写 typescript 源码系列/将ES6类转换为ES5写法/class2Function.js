// 将下面代码转换为普通构造函数的写法
class Person1 {
  constructor(name) {
    this.name = name;
  }

  func() {
    console.log(this.name);
  }
}

// 1. class 内的代码运行在严格模式下
('use strict');
function Person2(name) {
  // 2. class 构造函数不能作为普通函数调用，只能是new
  if (!(this instanceof Person2)) {
    throw new TypeError('Class constructor Person2 can not be invoke without "new"');
  }
  this.name = name;
}

// 3. class 内定义的原型方法是不可枚举的
Object.defineProperty(Person2.prototype, 'func', {
  value: function () {
    // 4. class内定义的原型方法只能通过实例调用
    if (!(this instanceof Person2)) {
      throw new TypeError('func is not a constructor');
    }
    // 5. 如果原型方法使用到 this, 由于运行在严格模式下， 普通调用情况下，this 为 undefined
    console.log(this.name);
  },
  enumerable: false,
});

export { Person1, Person2 };
