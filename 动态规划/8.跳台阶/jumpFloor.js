/*
一只青蛙一次可以跳上1级台阶，也可以跳上2级。
求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
*/

function jumpFloor(number) {
    // write code here
    if (number < 1) {
        throw new Error('the input number is invalid')
    }
    if (number < 3) {
        return number
    }
    let a = 1,
        b = 2,
        res
    for (let i = 2; i < number; i++) {
        res = a + b
        a = b
        b = res
    }
    return res
}

var number = 10
console.log(jumpFloor(number))