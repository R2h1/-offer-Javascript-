/**
 * 原理是：利用对象方法调用改变 this 值
 * @param {*} thisArg 指定函数运行时内部的 this
 * @param {...any} args 函数运行时传入的参数列表（直接使用剩余参数收集就好）
 */
//@ts-ignore
Function.prototype.myCall = function (thisArg: any, ...args: any[]) {
  thisArg = thisArg === undefined || thisArg === null ? globalThis : Object(thisArg);
  // 用 Symbol 作为属性名, 防止覆盖已有属性
  const fn = Symbol('fn');
  // this 即被调用函数
  Object.defineProperty(thisArg, fn, {
    value: this,
    enumerable: false
  });
  const result = thisArg[fn](...args);
  delete thisArg[fn];

  return result;
};
