/*
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
语法：function.call(thisArg, arg1, arg2, ...)
call()的原理比较简单，由于函数的this指向它的直接调用者，我们变更调用者即完成this指向的变更：
*/

//变更函数调用者示例
function foo() {
    console.log(this.name)
}

// 测试
const obj = {
    name: '写代码像蔡徐抻'
}
obj.foo = foo   // 变更foo的调用者
obj.foo()       // '写代码像蔡徐抻'

//简单实现
Function.prototype.myCall = function(thisArg, ...args) {
    thisArg.fn = this              // this指向调用call的对象,即我们要改变this指向的函数
    return thisArg.fn(...args)     // 执行函数并return其执行结果
}

//完整实现
Function.prototype.myCall = function(thisArg, ...args) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args)  // 执行当前函数
    delete thisArg[fn]              // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
}

//测试
foo.myCall(obj)     // 输出'写代码像蔡徐抻
