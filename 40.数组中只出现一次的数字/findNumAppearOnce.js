/*
一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。
*/

function FindNumsAppearOnce1(array)
{
    let len = array.length
    if (len < 2) return []
    let xor = 0
    for (let i = 0; i < len;i++) {
        xor ^= array[i]
    }
    if (xor === 0) return []
    let index = 0
    while ((xor & 1 ) === 0) {
        xor >>= 1
        index++
    }
    let num1 = 0,
        num2 = 0
    for (let i = 0; i < len;i++) {
        if (((array[i] >> index) & 1) === 1) {
            num1 ^= array[i]
        } else {
            num2 ^= array[i]
        }
    }
    return [num1,num2]
    // write code here
    // return list, 比如[a,b]，其中a,b是出现一次的两个数字
}

function FindNumsAppearOnce2(array)
{
    let helpHash = {}
    for (let i = 0; i < array.length;i++) {
        if (helpHash[array[i]]) {
            helpHash[array[i]] += 1
        } else {
            helpHash[array[i]] = 1
        }
    }
    let res = []
    for (let i = 0; i < array.length;i++) {
        if (helpHash[array[i]] === 1) {
            res.push(array[i])
        }
    }
    return res
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
}

function FindNumsAppearOnce3(array)
{
    let res = []
    for (let i = 0;i < array.length;i++) {
        if (array.indexOf(array[i]) === array.lastIndexOf(array[i])) {
            res.push(array[i])
        }
    }
    return res
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
}
var array = [2,3,3,4,6,2,5,5]
console.log(FindNumsAppearOnce1(array))
console.log(FindNumsAppearOnce2(array))
console.log(FindNumsAppearOnce3(array))