/*
给你一根长度为n的绳子，请把绳子剪成整数长的m段（m、n都是整数，n>1并且m>1），每段绳子的长度记为k[0],k[1],...,k[m]。
请问k[0]xk[1]x...xk[m]可能的最大乘积是多少？
例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
示例1
    输入
        8
    输出
        18
*/

function cutRope(number) {
    if (number <= 1) return 1
    if (number > 1 && number < 4 ) return number - 1
    let product = 0,
        mod = number % 3
    if ( mod === 0) {
        product = Math.pow(3,number / 3)
    } else if (mod === 1) {
        product = 4 * Math.pow(3,(number - 4) / 3)
    } else {
        product = 2 * Math.pow(3,(number - 2) / 3)
    }
    return product
    // write code here
}


//在此基础上的大数版本：不使用原生Math.pow()
function multp(base, exp, p) {
    let res = 1
    for (let i = 0;i < exp;i++) {
        res = res * base % p
    }
    return res
}
var cuttingRope = function(number) {
    if (number <= 1) return 1
    if (number > 1 && number < 4 ) return number - 1
    let product = 0,
        mod = number % 3,
        p = 1000000007
    if ( mod === 0) {
        product = multp(3,number / 3, p)
    } else if (mod === 1) {
        product = 4 * multp(3,(number - 4) / 3, p) % p
    } else {
        product = 2 * multp(3,(number - 2) / 3, p) % p
    }
    return product 
};
