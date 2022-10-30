/**
 *
 * 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。
 * 如：输入整型 1234，返回字符串“4321”。
 * 要求必须使用递归函数调用，不能用全局变量
 * @param {*} num 只有一个参数传入
 * @return {*} 必须返回字符串
 */

const reverseNum = function (num) {
  // 必须为int
  if (typeof num !== 'number') throw new TypeError('num of input must be a int');
  num = num.toString();
  if (num.length <= 1) return num;
  // 最后一位
  let lastIndex = num.length - 1;
  // 最后一位之前的部分
  let subNum = parseInt(num.substring(0, lastIndex));
  return num[lastIndex] + reverseNum(subNum);
};

var num = 1234;

console.log(reverseNum(num));
