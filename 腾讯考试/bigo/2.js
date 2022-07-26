/*
 判断整数是否对称
*/
const isNumSymmetry = (num) => {
    if (num > 0) { // 正整数
        let strNum = num.toString()
        console.log(strNum)
        let left = 0,
            right = strNum.length - 1
        while(left < right) {
            if (strNum[left] == strNum[right]) {
                left++
                right--
            } else {
                return false
            }
        }
        return true
    }
    return false
}

var num = 1233211
console.log(isNumSymmetry(num))