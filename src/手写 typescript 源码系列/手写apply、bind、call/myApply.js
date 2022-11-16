/**
 * @param {*} thisArg 指定函数运行时内部的this
 * @param {*} args 函数运行时传入的参数：一个数组或者类数组对象
 */
Function.prototype.myApply = function (thisArg, args) {
  // this 即被调用函数，判断是否时 function
  if (typeof this !== 'function') {
    throw new TypeError('调用 apply 的不是函数');
  }

  // 如果 thisArg 省略 或 null 或 undefined，默认为全局对象
  thisArg = thisArg || window;
  // 使用 Symbol 创建一个 thisArg 的唯一属性键，存储被调用函数即 this
  const func = Symbol('func');
  thisArg[func] = this;

  // 作为 thisArg 的属性调用被调用函数，并传递参数（如此被调用函数内部的this 就是 thisArgs 了）
  const result = thisArg[func](...args);

  // 执行完删除刚才新增的属性值
  delete thisArg[func];

  // 返回被调用函数的调用结果
  return result;
};
