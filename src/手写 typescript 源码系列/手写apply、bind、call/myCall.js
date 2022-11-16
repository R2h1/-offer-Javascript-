/**
 * 原理是：利用对象方法调用改变this值
 * @param {*} thisArg 指定函数运行时内部的this
 * @param {...any} args 函数运行时传入的参数列表（直接使用剩余参数收集就好）
 */
Function.prototype.myCall = function (thisArg, ...args) {
  thisArg = thisArg || window;
  // 唯一属性fn,防止覆盖已有属性
  const fn = Symbol('fn');
  // this即被调用函数
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];

  return result;
};
