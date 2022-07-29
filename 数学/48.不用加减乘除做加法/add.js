/*
写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
*/
function Add(num1, num2)
{
    while (num2 !== 0) {
        // 当没有进位的时候，异或就是求和
        let sum = num1 ^ num2
        num2 = (num1 & num2) << 1
        num1 = sum
    }
    return num1
    // write code here
}

var num1 = 238,
    num2 = 1636
console.log(Add(num1,num2))