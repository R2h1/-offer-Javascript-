/*
 
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