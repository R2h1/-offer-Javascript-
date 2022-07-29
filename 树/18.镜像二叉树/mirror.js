/*
操作给定的二叉树，将其变换为源二叉树的镜像。
输入描述:
二叉树的镜像定义：源二叉树 
            8
           /  \
          6   10
         / \  / \
        5  7 9 11
        镜像二叉树
            8
           /  \
          10   6
         / \  / \
        11 9 7  5
*/

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function Mirror(root) {
    if (root === null) return
    let tree = root.right
    root.right = root.left
    root.left = tree
    Mirror(root.left)
    Mirror(root.right)
    // write code here
}



//这个是返回新的一个树，没有修改原来的树
function mirrorTree(root) {
    //递归终止条件
    if (root === null) {
        return null
    }
    let newRoot = new TreeNode(root.val)
    newRoot.left = mirrorTree(root.right)
    newRoot.right = mirrorTree(root.left)
    return newRoot
}