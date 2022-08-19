/**
 * 
 * @param {*} thisArgs 没有传默认为window
 * @param  {...any} args 剩余参数-作为调用myCall的函数的参数
 */
Function.prototype.myCall = function(thisArg, ...args) {
    thisArg = thisArg || window
    // 唯一属性fn,防止覆盖已有属性
    const fn = Symbol('fn')
    // this即被调用函数
    thisArg[fn] = this
    const result = thisArg[fn](...args)
    delete thisArg[fn]

    return result
}
const test = function(x, y) {
    console.log('调用者:',this)
    return x + y
}

console.log(test.myCall({name: 'rrh_th'}, 1, 2))

