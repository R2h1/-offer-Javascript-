/*
输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。
*/

/*
原码是最高位为符号位，正数该位为0，负数该位为1，其余位为数值位，（0有两种表示：+0和-0），其余位表示数值的大小
正整数的补码是其二进制表示，与原码相同。负整数的补码，将其原码除符号位外的所有位取反后加1。
数0的补码表示是唯一的，每一位为0。
*/
function NumberOf1(n) {
    let count = 0
    while (n !== 0) {
        // n & n - 1的按位与会将最右边的 1 变为0
        n = n & (n - 1)
        count++
    }
    return count
    // write code here
}
/*利用位运算，直接操作二进制*/
function NumberOf1(n) {
    let count = 0,
        operator = 1
    // 由于 n 如果为负数，补码表示为其原码除符号位外的所有位取反后加1，
    // 比如-9 补码为(非符号位取反10001001) + 1 = 11110110 + 1 = 11110111
    while (operator !== 0) {
        if (n & operator) {
            count++
        }
        //左移时，移动31位后变为负数，再右移一位后变为0
        operator <<= 1
    }
}
for (let i = 0; i < 10; i++) {
    let n = Math.round(Math.random() * 100)
    console.log(n, NumberOf1(n))
}