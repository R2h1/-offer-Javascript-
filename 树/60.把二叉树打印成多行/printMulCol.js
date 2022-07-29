/*
从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。
*/
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(root)
{
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
    // write code here
}