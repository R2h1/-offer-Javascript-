// 使用数组reduce实现map方法
Array.prototype._map = function (fn, thisArg) {
  const result = [];
  this.reduce((prev, curr, index, array) => {
    result[index] = fn.call(thisArg, array[index], index, array);
  }, 0);
  return result;
};
