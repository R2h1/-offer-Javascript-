/*
输入一个非空整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
（二叉搜索树：中序遍历是升序的）
如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。
*/

function ascSort(a, b) {
    return a - b
}

function VerifySquenceOfBST(sequence) {
    if (sequence.length === 0) {
        return false
    }
    let helpStack = []
    let seqArray = sequence.slice() //深拷贝
    let sortSequence = seqArray.sort(ascSort)
    while (sequence.length !== 0) {
        let len = helpStack.length
        if (len > 0 && helpStack[len - 1] === sequence[0]) {
            helpStack.pop()
            sequence.shift()
        } else if (len === 0 || helpStack[len - 1] !== sequence[0]) {
            let index = sortSequence.indexOf(sequence[0])
            if (index !== -1) {
                for (let i = 0; i <= index; i++) {
                    helpStack.push(sortSequence.shift())
                }
                helpStack.pop()
                sequence.shift()
            } else {
                break
            }
        }
    }
    return sequence.length === 0
    // write code here
}

var sequence = [7, 4, 5, 6]
console.log(VerifySquenceOfBST(sequence))