/*
一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。
求该青蛙跳上一个n级的台阶总共有多少种跳法。
*/
// f(n) = 1 + f(n-1) + f(n-2) + f(n-3) + ... + f(1),其中第一项 1 表示 一次跳 n 阶
// 同理 f(n-1) = 1 + f(n-2) + f(n-3) + f(n-4) + ... + f(1)
// 两式相减 得到 f(n) = 2 * f(n-1) 其中 f(1) = 1
function jumpFloorII(number) {
    if (number < 1) {
        throw new Error("the input number is invalid")
    }
    if (number === 1) {
        return 1
    }
    let res = 1
    for (let i = 1; i < number; i++) {
        res = 2 * res
    }
    return res
    // write code here
    // return Math.pow(2, number - 1)
}

var number = 10
console.log(jumpFloorII(number))