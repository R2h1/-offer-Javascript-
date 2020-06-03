/*
输入一棵二叉树，求该树的深度。
从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。
*/
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot)
{
    if (pRoot === null) return 0
    let left = pRoot.left,
        right = pRoot.right
    return 1 + Math.max(TreeDepth(left),TreeDepth(right))
    // write code here
}

function TreeDepth(pRoot)
{
    if (pRoot === null) return 0
    let helpQue = [[pRoot,1]],
        nodeInfo,
        node,
        depth
    while (helpQue.length) {
        nodeInfo = helpQue.shift()
        node = nodeInfo[0]
        depth = nodeInfo[1]
        let left = node.left,
            right = node.right
        if (left !== null) {
            helpQue.push([left,depth + 1])
        }
        if (right !== null) {
            helpQue.push([right,depth + 1])
        }
    }
    return depth
    // write code here
}