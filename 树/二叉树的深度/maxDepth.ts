/**
 * 题目描述：
 *     输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。
 *  分析：
 *      自底向上递归法，
 */

import { BinaryTreeNode } from "../二叉树设计实现和遍历/traversal";

// 自底向上递归法，
function maxDepth1(root:  BinaryTreeNode| null): number {
    if (root === null) return 0;
    const left = root.left;
    const right = root.right;
    return 1 + Math.max(maxDepth1(left), maxDepth1(right));
};

// 自顶向下递归法
function maxDepth2(root:  BinaryTreeNode | null): number {
    let depth = 0;
    function traversal(node: BinaryTreeNode | null, count: number) {
        if (root === null) return;
        const left = root.left;
        const right = root.right;
        if (left === null && right === null) { // 当前节点是叶节点, 更新深度为该叶节点的路径长count与当前深度depth的较大值
            depth = Math.max(depth, count);
        }
        // 当前节点非空，遍历其左子树和右子树
        traversal(left, count + 1); 
        traversal(right, count + 1);
    }
    return depth;
};

// 层次遍历迭代法
function maxDepth3(root:  BinaryTreeNode | null): number {
    if (root === null) return 0
    const queue: [BinaryTreeNode, number][] = [[root, 1]];
    let depth = 0;
    while (queue.length) {
        const [node, layer] = queue.shift() as [BinaryTreeNode, number];
        const left = node.left;
        const right = node.right;
        if (left) { // 存在左子树
            queue.push([left, layer + 1]);
        }
        if (right) { // 存在右子树
            queue.push([right, layer + 1]);
        }
        depth = layer; // 队列中最后一个元素的层即深度

    }
    return depth;
};



