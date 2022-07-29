/*
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。
假设压入栈的所有数字均不相等。
例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，
但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）
*/
function IsPopOrder(pushV, popV) {
    let helpStack = []
    //辅助栈来模拟压入弹出
    while (pushV.length !== 0 || popV.length !== 0) {
        let len = helpStack.length
        if (len > 0 && helpStack[len - 1] === popV[0]) {
            helpStack.pop()
            popV.shift()
        } else if (len === 0 || helpStack[len - 1] !== popV[0]) {
            let index = pushV.indexOf(popV[0])
            if (index !== -1) {
                for (let i = 0; i <= index; i++) {
                    helpStack.push(pushV.shift())
                }
                helpStack.pop()
                popV.shift()
            } else {
                break
            }
        }
    }
    return popV.length === 0
}

console.log(IsPopOrder([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]))

console.log(IsPopOrder([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))