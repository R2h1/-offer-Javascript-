import { LinkNode } from '../../链表/设计链表/linkList';

/**
 * 设计实现栈
 */
// 数组栈
export class ArrayStack<T> {
  items: T[];
  constructor() {
    this.items = [];
  }
  /**
   * 入栈
   * @param item
   */
  push(item: T) {
    this.items.push(item);
  }
  /**
   * 出栈
   * @returns
   */
  pop() {
    if (this.isEmpty) throw new Error('栈空');
    return this.items.pop();
  }
  /**
   * 获取栈顶元素
   * @returns
   */
  peek() {
    if (this.isEmpty) throw new Error('栈空');
    return this.items[this.size - 1];
  }
  /**
   * 判空
   * @returns
   */
  get isEmpty() {
    return this.size === 0;
  }
  /**
   * 获取栈元素的个数
   * @returns
   */
  get size() {
    return this.items.length;
  }
}

// 链表栈
export class LinkStack<T> {
  // 栈的长度
  size: number;
  // 栈顶指针
  top: LinkNode<T> | null;
  constructor() {
    this.size = 0;
    this.top = null;
  }
  /**
   * 入栈
   * @param item
   */
  push(val: T) {
    const node = new LinkNode(val);
    if (this.isEmpty) {
      // 栈空
      this.top = node;
    } else {
      // 栈非空
      node.next = this.top;
      this.top = node;
    }
    this.size = this.size + 1;
  }
  /**
   * 出栈
   * @returns
   */
  pop() {
    if (this.isEmpty) {
      // 栈空
      throw new Error('栈空');
    }
    // 栈非空
    const data = this.top!.val; // 栈顶元素值
    this.top = this.top!.next; // 新栈顶
    this.size = this.size - 1;
    return data;
  }
  /**
   * 获取栈顶元素
   * @returns
   */
  peek() {
    if (this.isEmpty) {
      // 栈空
      throw new Error('栈空');
    }
    return this.top!.val;
  }
  /**
   * 判空
   * @returns
   */
  get isEmpty() {
    return this.top === null;
  }
}
