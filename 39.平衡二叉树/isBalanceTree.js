/*
输入一棵二叉树，判断该二叉树是否是平衡二叉树。
在这里，我们只需要考虑其平衡性，不需要考虑其是不是排序二叉树
*/ 

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(root) {
    if (root === null) return 0
    let left = root.left,
        right = root.right
    return 1 + Math.max(TreeDepth(left),TreeDepth(right))
}
function IsBalanced_Solution(pRoot) {
    if (pRoot === null) return true
    let leftDepth = TreeDepth(pRoot.left),
        rightDepth = TreeDepth(pRoot.right)
    if (Math.abs(leftDepth - rightDepth) > 1) return false
    return IsBalanced_Solution(pRoot.left) && IsBalanced_Solution(pRoot.right)
    // write code here
}