/**
 *
 * @param {*} thisArg 调用者
 * @param {*} args 传入被调用函数的参数数组
 */
Function.prototype.myApply = function (thisArg, args) {
  thisArg = thisArg || window;

  let fn = Symbol('fn');
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
};

const test = function (x, y) {
  console.log('调用者:', this);
  return x + y;
};

console.log(test.myApply({ name: 'rrh_th' }, [1, 2]));
