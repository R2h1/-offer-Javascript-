// 使用数组reduce实现map方法

Array.prototype._map = function (fn, thisArg) {
  const result = [];
  this.reduce((prev, curr, index, array) => {
    result[index] = fn.call(thisArg, array[index], index, array);
  }, 0);
  return result;
};

// map(function callback( currentValue[, index[, array]]) {} [, thisArg])
// reduce(callback(accumulator, currentValue[, index[, array]]) [, initialValue]) 提供初始值index从0开始

// 使用reduce将数组的每个元素+索引值 + thisArg的length
const arr = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8];

const _mapArr = arr._map(function (v, i) {
  return v + i + this.length; // v + i + 3
}, arr2);

console.log(_mapArr);
