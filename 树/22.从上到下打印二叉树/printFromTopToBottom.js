/*
从上往下打印出二叉树的每个节点，同层节点从左至右打印。(层序遍历)
返回的是一维数组
*/

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function PrintFromTopToBottom(root) {
    if (root === null) {
        return []
    }
    let res = []
    let queue = [root]
    while (queue.length !== 0) {
        console.log(queue)
        let node = queue.shift()
        res.push(node.val)
        if (node.left !== null) {
            queue.push(node.left)
        }
        if (node.right !== null) {
            queue.push(node.right)
        }
    }
    return res
    // write code here
}
//如果返回的是二维数组
/*二叉树：[3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]*/
function PrintFromTopToBottom(root) {
    if (root === null) {
        return []
    }
    let res = []
    let queue = [root]
    while (queue.length !== 0) {
        let len = queue.length
        let arr = []
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            arr.push(node.val)
            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)
        }
        res.push(arr)
    }
    return res
}

/*
请实现一个函数按照之字形顺序打印二叉树
即第一行按照从左到右的顺序打印，
第二层按照从右到左的顺序打印，
第三行再按照从左到右的顺序打印，其他行以此类推。
二叉树：[3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [20,9],
  [15,7]
]
*/

function PrintFromTopToBottom(root) {
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
}