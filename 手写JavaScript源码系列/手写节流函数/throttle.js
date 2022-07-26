/**
 * 实现原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器
 * @param {*} fn 被节流函数
 * @param {*} wait 间隔时间
 */
const throttle = function(fn, wait) {
    let timer = null
    return function(...args) {
        let _this = this
        if (timer) return
        timer = setTimout(() => {
            timer = null
            fn.apply(_this, args)
        }, wait)
    }
}