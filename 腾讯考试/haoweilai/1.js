function getMaxDiff( arr ) {
    // write code here
    let minNum = arr[0],
        maxNum = arr[0]
    let len = arr.length
    for (let i = 0; i < len;i++) {
        minNum = Math.min(minNum, arr[i])
        maxNum = Math.max(maxNum, arr[i])
        console.log(minNum, maxNum)
    }
    return maxNum - minNum
}


function ListNode(val) {
    this.val = val
    this.next = null
}

const node = new ListNode(1)
var arr = [1, 8, 0, -2]
console.log(getMaxDiff(arr))