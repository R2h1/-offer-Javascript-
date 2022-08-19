/**
 * 设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
 * @param {*} fn 被防抖函数
 * @param {*} wait 等待时间
 */
const debounce = function(fn, wait) {
    // 计时器
    let timer = null
    // 事件触发后实际执行的函数(监听的已经是这个函数了，所以timer是实际执行函数的外层作用域)
    return function(...args) {
        let _this = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(_this, args)
        }, wait)
    }
}