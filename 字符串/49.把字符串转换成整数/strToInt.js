/*
将一个字符串转换成一个整数，要求不能使用字符串转换整数的库函数。 
数值为0或者字符串不是一个合法的数值则返回0
输入描述:
    输入一个字符串,包括数字字母符号,可以为空
输出描述:
    如果是合法的数值表达则返回该数字，否则返回0
输入
    +2147483647
    1a33
输出
    2147483647
    0
*/ 

function StrToInt1(str)
{

    let res = 0,
        sign = 1
    str = str.trim()
    // 有负号
    if (str[0] === '-') {
        sign = -1
    }
    for (let i = (str[0] === '+' || str[0] === '-' ) ? 1:0;i < str.length; i++) {
        if (str[i] < '0' || str[i] > '9') {
            return 0
        }
        res = res * 10 + (str[i] - '0')
    }
    return res * sign
    // write code here
}


function StrToInt2(str) {

    let index = str.length
    str = str.trim()
    let start = (str[0] === '+' || str[0] === '-' ) ? 1 : 0
    for (let i = start;i < str.length;i++) {
        if (str[i] < '0' || str[i] > '9') {
            index = i
            break
        }
    }
    str = str.substring(0,index)
    if (str === '+' || str === '-' ) return 0
    let res = +str
    if (res < -2147483648 ) return -2147483648
    else if (res > 2147483647 ) return 2147483647
    else return res
    // return Number(str) || 0
}

var str = ' -2147483649'
console.log(StrToInt1(str))
console.log(StrToInt2(str))

