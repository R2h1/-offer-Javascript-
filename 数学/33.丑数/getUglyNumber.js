/*把只包含质因子2、3和5的数称作丑数（Ugly Number）。
例如6、8都是丑数，但14不是，因为它包含质因子7。
 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。
*/

function isUglyNumer(num) {
    while (num % 2 === 0) {
        num /= 2
    }
    while (num % 3 === 0) {
        num /= 3
    }
    while (num % 5 === 0) {
        num /= 5
    }
    return num === 1 ? true : false
    
}
function GetUglyNumber_Solution(index)
{
    if (index < 0) {
        return 0
    }
    let num = 1
    while (true) {
        if (isUglyNumer(num)) {
            index--
        }
        if (index === 0) {
            return num
        }
        num++
    }
    // write code here
}

function GetUglyNumber_Solution2(index)
{
    if (index <= 0) {
        return 0
    }
    let uglyArr = [1],
        factor2 = 0,
        factor3 = 0,
        factor5 = 0
    for (let i = 1;i < index;i++) {
        let ugly2 = uglyArr[factor2]*2, 
            ugly3 = uglyArr[factor3]*3, 
            ugly5 = uglyArr[factor5]*5
        uglyArr[i] = Math.min(ugly2, ugly3, ugly5)
        if (uglyArr[i] === ugly2) factor2++
        if (uglyArr[i] === ugly3) factor3++
        if (uglyArr[i] === ugly5) factor5++
    }
    return uglyArr[index - 1]
    // write code here
}

var index = 20
console.log(GetUglyNumber_Solution(index))
console.log(GetUglyNumber_Solution2(index))