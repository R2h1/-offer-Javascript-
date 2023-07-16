/**
 * bind和call,apply不同在于不会立即执行，
 * @param {*} thisArg  指定函数运行时内部的this
 * @param  {...any} outArgs 函数运行时传入的参数列表（直接使用剩余参数收集就好）
 */
// @ts-ignore
Function.prototype.myBind = function (thisArg: any, ...outArgs: any[]) {
  // this 即被调用函数，判断是否是 function
  if (typeof this !== 'function') {
    throw new Error('调用 bind 的不是函数');
  }
  // 保存调用 bind 的函数
  const that = this;
  // 返回的绑定函数
  const boundFn = function (this: any, ...innerArgs: any[]) {
    const args = outArgs.concat(innerArgs);
    return that.apply(this instanceof boundFn ? this : thisArg, args);
  };
  // 返回的绑定函数需要继承被调用函数的的属性和方法
  // 相当于 boundFn.prototype.__proto__ === that.prototype;
  boundFn.prototype = Object.create(that.prototype);
  return boundFn;
};
