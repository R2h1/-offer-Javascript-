// 比较结果的枚举值
enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0,
}

// 规定自定义Compare的类型
type ICompareFunction<T> = (a: T, b: T) => number;

/**
 * 默认的大小比较函数
 * @param {T} a
 * @param {T} b
 * @return {Compare} 返回 -1 0 1 代表 小于 等于 大于
 */
function defaultCompare<T>(a: T, b: T): Compare {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function cb<T>(node: BinarySearchTreeNode<T>){
    console.log(node);
    return node;
}

class BinarySearchTreeNode<T> {
    constructor(
        public key: T, 
        public value: any = key, 
        public left: BinarySearchTreeNode<T> | null = null, 
        public right: BinarySearchTreeNode<T> | null = null
    ) {}
    get isLeaf() {
        return this.left === null && this.right === null;
    }
    get hasChildren() {
        return !this.isLeaf;
    }
    get hasBothChildren() {
        return this.left !== null && this.right !== null;
    }
    get hasLeftChild() {
        return this.left !== null;
    }
}

class BinarySearchTree<T> {
    protected root: BinarySearchTreeNode<T> | null;
    constructor(key: T, value = key, protected compareFn: ICompareFunction<T> = defaultCompare) {
        this.root = new BinarySearchTreeNode(key, value);
    }

    * inOrderTraversal(node = this.root, callback: (node: BinarySearchTreeNode<T>) => BinarySearchTreeNode<T>) {
        if (node) {
            const { left, right } = node;
            if (left) yield* this.inOrderTraversal(left, callback);
            yield callback(node);
            if (right) yield* this.inOrderTraversal(right, callback);
        }
    }

    * postOrderTraversal(node = this.root, callback: (node: BinarySearchTreeNode<T>) => BinarySearchTreeNode<T>) {
        if (node) {
            const { left, right } = node;
            if (left) yield* this.postOrderTraversal(left, callback);
            if (right) yield* this.postOrderTraversal(right, callback);
            yield callback(node);
        }
    }
    * preOrderTraversal(node = this.root, callback: (node: BinarySearchTreeNode<T>) => BinarySearchTreeNode<T>) {
        if (node) {
            const { left, right } = node;
            yield callback(node);
            if (left) yield* this.preOrderTraversal(left, callback);
            if (right) yield* this.preOrderTraversal(right, callback);
        }
    }
    /**
     * 插入某个节点
     * @param key 
     * @param value 
     * @returns 
     */
    insert(key: T, value = key) {
        let node = this.root;
        while (node) {
            const { key: nodeKey, left, right } = node;
            if (this.compareFn(key, nodeKey) === Compare.EQUALS) return false;
            if (this.compareFn(key, nodeKey) === Compare.LESS_THAN) {
                if (left !== null) node = node.left;
                else {
                    node.left = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            } else if (this.compareFn(key, nodeKey) === Compare.BIGGER_THAN) {
                if (right !== null) node = right;
                else {
                    node.right = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            }
        }
    }
    /**
     * 是否存在某个节点
     * @param key 
     * @returns 
     */
    has(node: BinarySearchTreeNode<T> | null, key: T) {
        for (const current of this.postOrderTraversal(node, cb)) {
            if (current.key === key) return true;
        }
        return false;
    }
    /**
     * 搜索某个节点
     * @param key 
     * @returns 
     */
    find(node: BinarySearchTreeNode<T> | null, key: T) {
        for (const current of this.postOrderTraversal(node, cb)) {
            if (current.key === key) return current;
        }
        return undefined;
    }
    /**
     * 移除指定元素
     */
    remove(key: T) {
        this.root = this.removeNode(this.root, key);
    }
    /**
     * 移除某个节点
     * @param key 
     * @returns 
     */
    private removeNode(node: BinarySearchTreeNode<T> | null, key: T): BinarySearchTreeNode<T> | null {
        let current = this.find(node, key);
        if (!current) return null;
        if (current.isLeaf) { // 删除叶子节点
            current = null;
            return current;
        }
        if (current.hasBothChild) { // 有两个节点
            const aux = this.minNode(current.right)!;
            current.key = aux.key;
            this.removeNode(current.right, aux.key);
        } 
        if (current.hasLeftChild) { // 只有左节点
            current = current.left;
            return current;
        }
        // 只有右节点
        current = current.right; 
        return current;
    }
    /**
     * 返回根节点
     */
    getRoot(): BinarySearchTreeNode<T> | null {
        return this.root;
    }
    /**
     * 返回树中的最小元素
     */
    min(): BinarySearchTreeNode<T> | null {
        // 调用迭代方法
        return this.minNode(this.root);
    }
    /**
     * 返回指定子树下的最小元素
     */
    protected minNode(node: BinarySearchTreeNode<T> | null): BinarySearchTreeNode<T> | null {
        let current = node;
        // 不断向左查
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    /**
     * 返回树中的最大元素
     */
    max(): BinarySearchTreeNode<T> | null {
        // 调用迭代方法
        return this.maxNode(this.root);
    }
    /**
     * 返回指定子树下的最大元素
     */
    protected maxNode(node: BinarySearchTreeNode<T> | null): BinarySearchTreeNode<T> | null {
        let current = node;
        // 不断向右查
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    /**
     * 搜索元素
     */
    search(key: T): boolean {
        // 调用递归方法
        return this.searchNode(this.root, key);
    }
    /**
     * 递归搜索
     */
    private searchNode(node: BinarySearchTreeNode<T> | null, key: T): boolean {
        // 查到尽头返回 false
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            // key 比 node.key 小，向左查
            return this.searchNode(node.left, key);
        }
        if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            // key 比 node.key 大，向右查
            return this.searchNode(node.right, key);
        }
        return true;
    }
}