/*
请实现一个函数按照之字形打印二叉树，
即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印，第三行按照从左到右的顺序打印，
其他行以此类推。
*/ 

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */


function Print(pRoot)
{

    if (root === null) {
        return []
    }
    let res = []
    let queue = [root]
    let isReverse = false
    while (queue.length !== 0) {
        let len = queue.length
        let arr = []
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            arr.push(node.val)
            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)
        }
        if (isReverse === true) {
            arr = arr.reverse()
            isReverse = false
        } else {
            isReverse = true
        }
        res.push(arr)
    }
    return res
    // write code here
}