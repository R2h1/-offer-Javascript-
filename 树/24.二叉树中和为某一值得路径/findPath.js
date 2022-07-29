/*
输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
*/

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
*/
var stack
var path
function FindPath(root, expectNumber)
{
    if (root === null) {
        return []
    }
    path = []
    stack = []
    helper(root,expectNumber)
    return path
    // write code here
}

function helper(root,num) {
    let curVal = root.val
    stack.push(curVal)
    if (curVal === num && root.left === null && root.right === null) {
        path.push([...stack])
    } else {
        if (root.left !== null) {
            helper(root.left,num - curVal)
        }
        if (root.right !== null) {
            helper(root.right,num - curVal)
        }
    }
    stack.pop()
}