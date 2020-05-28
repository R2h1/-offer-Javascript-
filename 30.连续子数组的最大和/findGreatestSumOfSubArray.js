/*
HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。
今天测试组开完会后,他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,
当向量全为正数的时候,问题很好解决。但是,如果向量中包含负数,是否应该包含某个负数,并期望旁边的正数会弥补它呢？
例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)
*/
//暴力法
function FindGreatestSumOfSubArray(array)
{
    let len = array.length
    if (len === 0) {
        return null
    }
    let max = array[0],
        start = 0,
        end = 0
    for (let i = 0;i < len;i++) {
        let sum = 0
        for (let j = i;j < len;j++) {
            sum += array[j]
            if (sum > max) {
                max = sum
                start = i
                end = j
            }
        }
    }
    return max
    

    // write code here
}
//计算累加值和当前值比较，重置初始位置
function FindGreatestSumOfSubArray2(array)
{
    let len = array.length
    if (len === 0) {
        return null
    }
    let max = array[0],
        sum = array[0],
        start = 0,
        end = 0,
        flag = false
    for (let i = 1;i < len;i++) {
        sum += array[i]
        if (sum < array[i]) {
            sum = array[i]
            flag = true
        } else {
            flag = false
        }
        if (sum > max) {
            max = sum
            end = i
            if (flag === true) {
                start = i
            }
        }
    }
    return max
    // write code here
}

function FindGreatestSumOfSubArray3(array)
{
    let len = array.length
    if (len === 0) {
        return null
    }
    let arr = []
    for(let i = 0;i < len; i++) {
        // 前一个最大值是非正数，最大值为当前值
        if(i === 0 || arr[i-1] <= 0) {
            arr.push(array[i])
        } else {
            //否则 最大值 为 前一个最大值 加上当前值
            arr.push(arr[i - 1] + array[i]);
        }
    }
    return arr.sort((a, b)=>a-b).pop()
    // write code here
}
var array = [6,-3,-2,7,-15,1,2,2]
console.log(FindGreatestSumOfSubArray(array))
console.log(FindGreatestSumOfSubArray2(array))
console.log(FindGreatestSumOfSubArray3(array))