/**
 * 设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
 * @param {*} fn 被防抖函数
 * @param {*} wait 等待时间
 */
const debounce = function (fn, wait = 500, immediate = false) {
  // 计时器
  let timer = null;
  let cooldown = false; // 立即执行是否在冷却中
  // 事件触发后实际执行的函数(监听的已经是这个函数了，所以timer是实际执行函数的外层作用域)
  return function (...args) {
    if (!cooldown && immediate) {
      cooldown = true;
      fn.apply(this, args);
    }
    // 函数被调用，清除定时器
    timer && clearTimeout(timer);
    // 箭头函数不用保存this
    timer = setTimeout(() => {
      cooldown = false;
      fn.apply(this, args);
    }, wait);
  };
};
