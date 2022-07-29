/*
给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
保证base和exponent不同时为0
*/
//直接使用内置函数
function Power(base, exponent) {
    return Math.pow(base, exponent)
}
//通过判断exponent的正负求解
//会因为exponent过大而超时
function Power(base, exponent) {
    if (base === 0) {
        return 0
    }
    if (exponent === 0) {
        return 1
    }
    abs = exponent >= 0 ? exponent : -exponent
    let res = 1
    for (let i = 0; i < abs; i++) {
        res *= base
    }
    //指数为负且结果不为0的时候为其倒数
    return exponent > 0 ? res : 1 / res
}

//快速幂
function Power(base, exponent) {
    if (base === 0) {
        return 0
    }
    abs = exponent >= 0 ? exponent : -exponent
    let res = 1
    while (abs) {
        //指数 abs 的二进制最后一位为 1，是奇数
        if (abs & 1) {
            res = res * base
        }
        // 指数二进制表示每右移一位，因子 base 平方变化
        abs = Math.floor(abs / 2)
        base = base * base
    }
    return exponent < 0 ? 1 / res : res
}

var base = 4,
    exponent = -2

console.log(Power(base, exponent))