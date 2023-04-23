// 将下面代码转换为普通构造函数的写法
class Person1 {
  constructor(name) {
    this.name = name;
  }

  func() {
    console.log(this.name);
  }

  get total() {}
}

// 1. class 存在暂时性死区
var Person2 = (function () {
  // 2. class 内的代码运行在严格模式下
  'use strict';
  function Person(name) {
    // 3. class 构造函数不能作为普通函数调用，只能是new
    // 或者 Object.getPropertyOf(this) !== Person.prototype
    if (!(this instanceof Person)) {
      throw new TypeError('Class constructor Person2 can not be invoke without "new"');
    }
    this.name = name;
    // 8. 访问器属性会同时出现在原型和实例上，且不可枚举
    Object.defineProperty(this, 'total', {
      get() {},
      enumerable: false,
    });
  }

  // 4. class 内定义的原型方法是不可枚举的
  Object.defineProperty(Person.prototype, 'func', {
    value: function () {
      // 5. class内定义的原型方法只能通过实例调用
      // 或者 Object.getPropertyOf(this) === Person.prototype.func.prototype
      if (!(this instanceof Person)) {
        throw new TypeError('func is not a constructor');
      }
      // 6. 如果原型方法使用到 this, 由于运行在严格模式下， 普通调用情况下，this 为 undefined
      console.log(this.name);
    },
    enumerable: false,
  });

  // 7. 访问器属性会同时出现在原型和实例上，且不可枚举
  Object.defineProperty(Person.prototype, 'total', {
    get() {},
    enumerable: false,
  });

  return Person;
})();

export { Person1, Person2 };
