/**
 * 题目描述：
 *      实现两个函数，分别用来序列化(serialize)和反序列化(deserialize)二叉树。你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 *  分析：
 *      先序遍历法，子结构与子树不同，子结构可以在叶子节点不完全相同，即子树一定是子结构，子结构不一定是子树。首先，任何树不是空树的子结构，空树也不是任何树的子结构；其次判以当前节点为根的树是否包含断 B 树；如果不包含，再判断B是否是其左子树或其右子树的子结构。
 *      序列化法，由于树是对象，可以将其序列化成字符串，判断序列化A中是否包含序列化B。
 */
import { TreeNode } from "../二叉树设计实现和遍历/traversal";

// JSON
function serialize1(root: TreeNode | null) {
    return JSON.stringify(root);
};
function deserialize1(data: string) {
    return JSON.parse(data);
};

// 递归
function serialize2(root: TreeNode | null){
    if (root === null) {
        return 'None,'
    }
    const { left, right } = root;
    return `${root.val},${serialize2(left) + serialize2(right)}`;
}
function deserialize2(data: string) {
    // 递归进行反序列化
    function reDeserialize(dataArray: string[]) {
        const item = dataArray.shift();
        if (item === 'None') return null;
        const root = new TreeNode(Number(item), reDeserialize(dataArray), reDeserialize(dataArray));
        return root;
    }
    const dataArray = data.split(',');
    return reDeserialize(dataArray);
}