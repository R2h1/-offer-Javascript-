/*
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
*/
function minNumberInRotateArray(rotateArray) {
    let len = rotateArray.length
    if (len === 0) {
        return 0
    }
    let left = 0,
        right = len - 1
    // the rotate array include two part of  Ordered array 
    // num of the front part is larger than the back part
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if (rotateArray[mid] > rotateArray[right]) {
            // min num is in right part
            left = mid + 1
        } else if (rotateArray[mid] < rotateArray[right]) {
            // min num is in left part
            right = mid
        } else {
            right--
        }
    }
    return rotateArray[left]


    // write code here
}

function minNumberInRotateArray2(rotateArray) {
    let len = rotateArray.length
    if (len === 0) {
        return 0
    }
    for (let i = 1; i < len; i++) {
        if (rotateArray[i] < rotateArray[i - 1]) {
            return rotateArray[i]
        }
    }
    return rotateArray[0]
}

var rotateArray = [4, 5, 1, 2, 3]

console.log(minNumberInRotateArray2(rotateArray))