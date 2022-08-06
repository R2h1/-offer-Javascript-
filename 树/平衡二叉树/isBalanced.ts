/**
 * 题目描述：
 *     输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。
 *  分析：
 *     
 */

import { maxDepth1 } from "../二叉树的深度/maxDepth";
import { TreeNode } from "../二叉树设计实现和遍历/traversal"

// 深度计算法
function isBalanced(root: TreeNode | null): boolean {
    if (root === null) return true;
    const leftTree = root.left;
    const rightTree = root.right;
    // 左右子树高度差大于1，不平衡
    if (Math.abs(maxDepth1(leftTree) - maxDepth1(rightTree)) > 1) return false;
    // 否则取决于左子树与右子树分别是否平衡
    return isBalanced(leftTree) && isBalanced(rightTree);
};