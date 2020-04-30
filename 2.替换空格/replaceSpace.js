/*
请实现一个函数，将一个字符串中的每个空格替换成“%20”。
例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
*/

//暴力方法
function replaceSpace(str) {
    let res = '',
        len = str.length
    for (let i = 0; i < len; i++) {
        if (str[i] === ' ') {
            res += '%20'
        } else {
            res += str[i]
        }
    }
    return res
}

//正则表达式
function replaceSpace(str) {

    let reg = new RegExp(' ', 'g')
    let res = str.replace(reg, '%20')
    return res
    // write code here
}

console.log(replaceSpace('we are happy.'));