/*
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。
要求不能创建任何新的结点，只能调整树中结点指针的指向
*/

function TreeNode(x) {
    this.val = x
    this.left = null
    this.right = null
}

function Convert(pRootOfTree) {
    if (pRootOfTree === null) {
        return null
    }
    let stack = [],
        res = [],
        curNode = pRootOfTree
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
    let len = res.length 
    for (let i = 1;i < len - 1;i++) {
        res[i].left = res[i - 1]
        res[i].right = res[i + 1]
    }
    res[0].left = null
    res[0].right = res[1]
    res[len - 1].right = null
    res[len - 1].left = res[len - 2]

    // 循环双向链表
    /* 
    for (let i = 0;i < len;i++) {
        if (i === len - 1) {
            res[i].right = res[0]
        } else {
            res[i].right = res[i+1]
        }
        if (i === 0) {
            res[i].left = res[len - 1]
        } else {
            res[i].left = res[i - 1]
        }
    }
    */
    // write code here
    return res[0]
}