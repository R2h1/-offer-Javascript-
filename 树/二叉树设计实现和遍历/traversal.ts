/**
 * 二叉树的设计实现与遍历
 */

export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}

export class BinaryTreeNode {
    key: string | number; // 节点的键
    parent: BinaryTreeNode | null; // 节点的父节点
    value: any; // 节点的值
    left: BinaryTreeNode | null; // 指向节点左孩子的指针
    right: BinaryTreeNode | null; // 指向节点右孩子的指针
    constructor(key: string | number, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    get isLeaf() {
        return this.left === null && this.right === null;
    }
    get hasChildren() {
        return !this.isLeaf;
    }
}

export class BinaryTree {
    // 根节点
    root: BinaryTreeNode;
    constructor(key: string, value = key) {
        this.root = new BinaryTreeNode(key, value);
    }

    /**
     * 中序遍历 （首先遍历左子树，然后访问根节点，最后遍历右子树）
     * @param node 
     */
    * inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }
    /**
     * 后序遍历 （首先遍历左子树，然后遍历右子树，最后访问根节点）
     * @param node 
     */
    * postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }
    /**
     * 前序遍历 （首先访问根节点，然后遍历左子树，最后遍历右子树）
     * @param node 
     */
    * preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    /**
     * 插入一个节点作为给定父节点的子节点
     * @param parentNodeKey 
     * @param key 
     * @param value 
     * @param param3 
     * @returns 
     */
    insert(
        parentNodeKey: any,
        key: string,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) { // 插入到某父节点下，如果不指定则插入到左右孩子中的空的那个
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false; // 该父节点孩子节点不空余
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 从二叉树中删除一个节点及其子节点
     * @param key 
     * @returns 
     */
    remove(key: string) {
        for (const node of this.preOrderTraversal()) {
            if (node.left.key === key) {
                node.left = null;
                return true;
            }
            if (node.right.key === key) {
                node.right = null;
                return true;
            }
        }
        return false;
    }
    /**
     * 检索给定节点
     * @param key 
     * @returns 
     */
    find(key: string) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
};


/**
 * 前序遍历 （首先访问根节点，然后遍历左子树，最后遍历右子树）
 */
function preOrderTraversal(root: BinaryTreeNode | null) {
    if (root === null) return [];
    const result: number[] = [];
    const stack = [root];
    while (stack.length !== 0) {
        const current = stack.pop()!;
        result.push(current.value);
        const lChild = current.left;
        const rChild = current.right;
        // 栈后进先出，因此先右孩子入栈，然后左孩子入栈
        if (rChild !== null) stack.push(rChild);
        if (lChild !== null) stack.push(lChild);
    }
    return result;
}
/**
 * 中序遍历 （首先遍历左子树，然后访问根节点，最后遍历右子树）
 */
function inOrderTraversal(root: BinaryTreeNode | null) {
    if (root === null) return [];
    const result: number[] = [];
    const stack: BinaryTreeNode[] = [];
    let current: BinaryTreeNode | null = root;
    while (stack.length !== 0 || current !== null) {
        while (current !== null) { // 一直遍历到最左孩子节点
            stack.push(current);
            current = current.left;
        }
        if (stack.length !== 0) {  // 栈非空
            const node = stack.pop()!;
            result.push(node.value);
            current = node.right;  // 当前 -> 右
        }
    }
    return result;
}

/**
 * 后序遍历 （首先遍历左子树，然后遍历右子树，最后访问根节点）
 * @param node 
 */
function postOrderTraversal(root: BinaryTreeNode | null) {
    if (root === null) return [];
    const result: number[] = [];
    // 转变成遍历 根节点 -> 右节点 -> 左节点
    // 遍历结果数组进行reverse, 即得到左节点 -> 右节点 -> 根节点
    let stack = [root];
    while (stack.length !== 0) {
        let current = stack.pop()!;
        result.push(current.value);
        let lChild = current.left;
        let rChild = current.right;
        // 交换和前序的顺序
        if (lChild !== null) stack.push(lChild);
        if (rChild !== null) stack.push(rChild);
    }
    return result.reverse();  // 反转即可
}

/**
 * 层序遍历 （逐层遍历树结构，借助队列实现）
 * @param node 
 */
function leverOrderTraversal(root: BinaryTreeNode | null) {
    if (root === null) return [];
    const result: number[] = [];
    const queue = [root];  // 队列（先入先出）
    while (queue.length !== 0) {  // 队列非空
        const current = queue.shift()!;  // 队首出队
        result.push(current.value);
        const leftChild = current.left;
        const rightChild = current.right;
        if (leftChild !== null) queue.push(leftChild);
        if (rightChild !== null) queue.push(rightChild);
    }
    return result;
}