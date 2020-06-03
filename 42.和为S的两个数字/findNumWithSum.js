/*
输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，
如果有多对数字的和等于S，输出两个数的乘积最小的。
输出描述:
    对应每个测试案例，输出两个数，小的先输出。
*/
function FindNumbersWithSum(array, sum)
{
    if (!array || array.length < 2) {
        return []
    }
    let helpHash = {}
    for (let i = 0,len = array.length;i < len;i++) {
        helpHash[array[i]] = i
    }
    let res = []
    for (let i = 0,len = array.length;i < len;i++) {
        if (helpHash[sum - array[i]] && i !== helpHash[sum - array[i]]) {
            res.push(array[i],sum - array[i])
            break
        }
    }
    return res
    // write code here
}

function FindNumbersWithSum2(array,sum) {
    if (!array) return []
    let len = array.length
    if (len < 2) return []
    let left = 0,
        right = len - 1,
        res = []
    while (left < right) {
        let tmp = array[left] + array [right]
        if (tmp === sum) {
            res.push(array[left],array[right])
            break
        } else if (tmp > sum) {
            right--
        } else {
            left++
        }
    }
    return res
}

var array = [1,2,4,7,11,15],
    sum  = 15

console.log(FindNumbersWithSum(array,sum))