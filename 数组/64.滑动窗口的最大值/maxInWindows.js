/*
给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，
他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个：
 {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， 
 {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。
*/

function maxNum(arr) {
    let max = arr[0]
    for (let i = 1;i < arr.length;i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max
}
function maxInWindows(num, size)
{
    let len = num.length
    if (len === 0 || size < 1 || size > len) return []
    if (size === 1) return num
    let res = []
    for (let i = 0;i <= len - size;i++) {
        let window = num.slice(i,i+size)
        res.push(maxNum(window))
    }
    return res
    // write code here
}


var num = [2,65],
    size = 5
console.log(maxInWindows(num,size))
console.log(maxInWindows1(num,size))

function maxInWindows1(num, size)
{
    let len = num.length
    if (len === 0 || size < 1 || size > len) return []
    if (size === 1) return num
    let deque = []
    let res = []
    for (let i = 0; i < len; i++) {
        // 把滑动窗口之外的踢出
        if (i - deque[0] >= size) {
            deque.shift()
        }
        // 将比当前新加入值小的下标出队，知道遇到不比新加入值小的
        while (num[deque[deque.length - 1]] <= num[i]) {
            deque.pop()
        }
        deque.push(i)
        if (i >= size - 1) { 
            // 队列头始终是最大的数
            res.push(num[deque[0]])
        }
    }
    return res
}