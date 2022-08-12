import { TreeNode } from "../../树/二叉树设计实现和遍历/traversal";

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


class BinarySearchTreeNode<T> {
    key: T;
    value: any;
    left: BinarySearchTreeNode<T> | null;
    right: BinarySearchTreeNode<T> | null;
    constructor(key: T, value = key, left: BinarySearchTreeNode<T> | null = null, right: BinarySearchTreeNode<T> | null = null) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
    }
    get isLeaf() {
        return this.left === null && this.right === null;
    }
    get hasChildren() {
        return !this.isLeaf;
    }
}
class BinarySearchTree<T> {
    protected root: BinarySearchTreeNode<T> | null;
    constructor(key: T, value = key, protected compareFn: ICompareFunction<T> = defaultCompare) {
        this.root = new BinarySearchTreeNode(key, value);
    }

    * inOrderTraversal(node = this.root) {
        if (node?.left) yield* this.inOrderTraversal(node?.left);
        yield node;
        if (node?.right) yield* this.inOrderTraversal(node?.right);
    }

    * postOrderTraversal(node = this.root) {
        if (node?.left) yield* this.postOrderTraversal(node?.left);
        if (node?.right) yield* this.postOrderTraversal(node?.right);
        yield node;
    }
    * preOrderTraversal(node = this.root) {
        yield node;
        if (node?.left) yield* this.preOrderTraversal(node?.left);
        if (node?.right) yield* this.preOrderTraversal(node?.right);
    }
    insert(key: T, value = key) {
        let node = this.root;
        while (node) {
            if (node.key === key) return false;
            if (node.key > key) {
                if (node.left !== null) node = node.left;
                else {
                    node.left = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            } else if (node.key < key) {
                if (node?.right !== null) node = node?.right;
                else {
                    node.right = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            }
        }
    }
    has(key: string) {
        for (const node of this.postOrderTraversal()) {
            if (node.key === key) return true;
        }
        return false;
    }
    find(key: string) {
        for (const node of this.postOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
    remove(key: string) {
        const node = this.find(key);
        if (!node) return false;
        const isRoot = node.parent === null;
        const isLeftChild = !isRoot ? node.parent.left === node : false;
        const hasBothChildren = node.left !== null && node.right !== null;
    
        if (node.isLeaf) {
            if (!isRoot) {
            if (isLeftChild) node.parent.left = null;
            else node.parent.right = null;
            } else {
            this.root = null;
            }
            return true;
        }
        if (!hasBothChildren) {
            const child = node.left !== null ? node.left : node.right;
            if (!isRoot) {
                if (isLeftChild) node.parent.left = child;
                else node.parent.right = child;
            } else {
                this.root = child;
            }
            child.parent = node.parent;
            return true;
        }
        const rightmostLeft = [...this.inOrderTraversal(node.left)].slice(-1)[0];
        rightmostLeft.parent = node.parent;
        if (!isRoot) {
            if (isLeftChild) node.parent.left = rightmostLeft;
            else node.parent.right = rightmostLeft;
        } else {
            this.root = rightmostLeft;
        }
        rightmostLeft.right = node.right;
        node.right.parent = rightmostLeft;
        return true;
    }
} 

export class Node<K> {
    left: Node<K>;
    right: Node<K>;
  
    constructor(public key: K) {}
  
    toString() {
      return `${this.key}`;
    }
  }
  
class BinarySearchTree2<T> {
    protected root: Node<T>;
  
    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}
  
    /**
     * @description: 插入元素
     */
    insert(key: T) {
      if (this.root == null) {
        // 边界情况：插入到根节点
        this.root = new Node(key);
      } else {
        // 递归找到插入位置
        this.insertNode(this.root, key);
      }
    }
  
    /**
     * @description: 递归插入方法
     */
    protected insertNode(node: Node<T>, key: T) {
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        // key 比 node.key 小就向左查
        if (node.left == null) {
          // 基线条件：左面为空直接赋值
          node.left = new Node(key);
        } else {
          // 否则就接着递归
          this.insertNode(node.left, key);
        }
      } else {
        // key 比 node.key 大就向右查
        if (node.right == null) {
          // 基线条件：右面为空直接赋值
          node.right = new Node(key);
        } else {
          // 否则就接着递归
          this.insertNode(node.right, key);
        }
      }
    }
  
    /**
     * @description: 返回根节点
     */
    getRoot(): Node<T> {
      return this.root;
    }
  
    /**
     * @description: 搜索元素
     */
    search(key: T): boolean {
      // 调用递归方法
      return this.searchNode(this.root, key);
    }
  
    /**
     * @description: 递归搜索
     */
    private searchNode(node: Node<T>, key: T): boolean {
      // 基线条件：查到尽头返回false
      if (node == null) {
        return false;
      }
  
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        // key 比 node.key 小，向左查
        return this.searchNode(node.left, key);
      } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        // key 比 node.key 大，向右查
        return this.searchNode(node.right, key);
      } else {
        // 基线条件：既不大也不小，说明查到该元素，返回true
        return true;
      }
    }
  
    /**
     * @description: 中序遍历
     */
    inOrderTraverse(callback: Function) {
      // 调用中序遍历迭代方法
      this.inOrderTraverseNode(this.root, callback);
    }
  
    private inOrderTraverseNode(node: Node<T>, callback: Function) {
      // 基线条件
      if (node != null) {
        // 中序遍历的顺序是 左 -> 执行回调 -> 右
        this.inOrderTraverseNode(node.left, callback);
        callback(node.key);
        this.inOrderTraverseNode(node.right, callback);
      }
    }
  
    /**
     * @description: 先序遍历
     */
    preOrderTraverse(callback: Function) {
      // 调用先序遍历迭代方法
      this.preOrderTraverseNode(this.root, callback);
    }
  
    private preOrderTraverseNode(node: Node<T>, callback: Function) {
      // 基线条件
      if (node != null) {
        // 先序遍历的执行顺序是 执行回调 -> 左 -> 右
        callback(node.key);
        this.preOrderTraverseNode(node.left, callback);
        this.preOrderTraverseNode(node.right, callback);
      }
    }
  
    /**
     * @description: 后序遍历
     */
    postOrderTraverse(callback: Function) {
      // 调用后序遍历迭代方法
      this.postOrderTraverseNode(this.root, callback);
    }
  
    private postOrderTraverseNode(node: Node<T>, callback: Function) {
      // 基线条件
      if (node != null) {
        // 后序遍历的执行顺序是 左 -> 右 -> 执行回调
        this.postOrderTraverseNode(node.left, callback);
        this.postOrderTraverseNode(node.right, callback);
        callback(node.key);
      }
    }
  
    /**
     * @description: 返回树中的最小元素
     */
    min(): Node<T> {
      // 调用迭代方法
      return this.minNode(this.root);
    }
  
    /**
     * @description: 返回指定子树下的最小元素
     */
    protected minNode(node: Node<T>): Node<T> {
      let current = node;
      // 不断向左查
      while (current != null && current.left != null) {
        current = current.left;
      }
      return current;
    }
  
    /**
     * @description: 返回树中的最大元素
     */
    max(): Node<T> {
      // 调用迭代方法
      return this.maxNode(this.root);
    }
  
    /**
     * @description: 返回指定子树下的最大元素
     */
    protected maxNode(node: Node<T>): Node<T> {
      let current = node;
      // 不断向右查
      while (current != null && current.right != null) {
        current = current.right;
      }
      return current;
    }
  
    /**
     * @description: 移除指定元素
     */
    remove(key: T) {
      // 调用递归方法，这里的递归很特殊，会将删除后的树返回
      this.root = this.removeNode(this.root, key);
    }
  
    /**
     * @description: 递归方法，在指定子树中移除指定元素，每次处理完后都需要将处理后的节点返回给本节点
     */
    protected removeNode(node: Node<T>, key: T): Node<T> {
      // 基线条件
      if (node == null) {
        return null;
      }
  
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        // 当 key 小于 node.key 时，向左去找
        node.left = this.removeNode(node.left, key);
        return node;
      } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        // 当 key 大于 node.key 时，向右去找
        node.right = this.removeNode(node.right, key);
        return node;
      } else {
        // 此时已经查到了要删除的节点
        if (node.left == null && node.right == null) {
          // 当要删除的节点为叶子节点
          node = null;
          return node;
        } else if (node.left == null) {
          // 当要删除的节点只有一个子节点
          node = node.right;
          return node;
        } else if (node.right == null) {
          // 同样删除的节点只有一个子节点
          node = node.left;
          return node;
        } else {
          // 当要删除的节点有两个子节点
          const aux = this.minNode(node.right);
          node.key = aux.key;
          node.right = this.removeNode(node.right, aux.key);
          return node;
        }
      }
    }
  }