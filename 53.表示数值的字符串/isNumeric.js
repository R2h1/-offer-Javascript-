/*
请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 
但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是
*/

//s字符串
function isNumeric1(s)
{
    s = s.trim()
    return !isNaN(+s) && s.length !== 0
    // write code here
}

function isNumeric2(s) {
    let result = s.match(/\s*[+-]?((\d+(\.\d*)?)|\.\d+)([e][+-]?\d+)?\s*/g)
    return s !== '.' && result ? result[0] === s : false
}
function isNumeric3(s) {
    // write code here
    let isNum = false, isDot = false, isSymbol = false, isE = false
    s = s.trim()
    for(let v = 0; v < s.length; v++) {
        if (0 <= s[v] && s[v] <= 9 && s[v] != ' ') {
            isNum = true
        }else if (s[v] == 'e' || s[v] == 'E') {
            if (!isNum || isE) {
                return false
            }
            isE = true
            isNum = false
        }else if (s[v] == '.') {
            if(isDot || isE){
                return false
            }
            isDot = true
        }else if (s[v] == '-' || s[v] == '+') {
            if (v != 0 && (s[v - 1] != 'e' || s[v - 1] != 'e')) {
                return false
            }
        }else {
            return false
        }
    }
    return isNum
}
var s = "  "
console.log(isNumeric1(s))
console.log(isNumeric2(s))
console.log(isNumeric3(s))