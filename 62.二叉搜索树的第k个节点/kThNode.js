/*
给定一棵二叉搜索树，请找出其中的第k小的结点。
例如， （5，3，7，2，4，6，8）    中，按结点数值大小顺序第三小结点的值为4。
*/

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 层序遍历
function KthNode1(pRoot, k)
{
    if (pRoot === null || k < 1) {
        return null
    }
    let queue = [pRoot],
        res = []
    while (queue.length !== 0) {
        let curNode = queue.shift()
        res.push(curNode)
        if (curNode.left !== null ) {
            queue.push(curNode.left)
        }
        if (curNode.right !== null) {
            queue.push(curNode.right)
        }
    }
    res.sort((a,b) => {
        return a.val - b.val
    })
    return k > res.length ? null : res[k-1]
    // write code here
}

// 中序遍历即可
function KthNode2(pRoot, k)
{
    if (pRoot === null || k < 1) {
        return null
    }
    let stack = [],
        res = [],
        curNode = pRoot
    while (stack.length || curNode !== null) {
        while (curNode !== null) {
            stack.push(curNode)
            curNode = curNode.left
        }
        if (stack.length) {
            curNode = stack.pop()
            res.push(curNode)
            curNode = curNode.right
        }
    }
    return k > res.length ? null : res[k-1]
    // write code here
}