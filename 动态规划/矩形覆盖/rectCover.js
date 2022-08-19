/*
我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。
请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
比如n=3时，2*3的矩形块有3种覆盖方法
*/
function rectCover(number) {
    if (number < 1) {
        return null
    }
    if (number < 3) {
        return number
    }
    let f1 = 1,
        f2 = 2,
        res = 0
    for (let i = 2; i < number; i++) {
        res = f1 + f2
        f1 = f2
        f2 = res
    }
    return res
    // write code here
}
var number = 10
console.log(jumpFloorII(number))