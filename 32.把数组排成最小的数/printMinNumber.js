/*
输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323
*/ 
function compare(a, b) {
    let str1 = a.toString(10),
        str2 = b.toString(10)
    // mn nm 比较大小
    return str1 + str2 > str2 + str1 ? 1 : -1
}
function PrintMinNumber(numbers) {
    numbers.sort(compare)
    return numbers.join('')
}

var numbers = [3,32,321]
console.log(PrintMinNumber(numbers))