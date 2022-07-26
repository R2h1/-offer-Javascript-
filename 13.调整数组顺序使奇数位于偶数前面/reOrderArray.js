/*
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，
使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，
并保证奇数和奇数，偶数和偶数之间的相对位置不变。
 */
// 新开辟数组法
function reOrderArray(array) {
    let odd = [],
        even = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] & 1) {
            odd.push(array[i])
        } else {
            even.push(array[i])
        }
    }
    return odd.concat(even)
    // write code here
}
//双指针法(允许奇数偶数各自顺序改变)
function reOrderArray(array) {
    let left = 0,
        right = array.length - 1
    while (left < right) {
        //左边是偶数，右边是奇数，交换
        if (array[left] % 2 === 0 && array[right] % 2) {
            let tmp = array[right]
            array[right] = array[left]
            array[left] = tmp
            left++
            right--
        } else {
            //左边是奇数
            if (array[left] % 2) {
                left++
            }
            //右边是偶数
            if (array[right] % 2 === 0) {
                right--
            }
        }
    }
    // write code here
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(reOrderArray(arr))