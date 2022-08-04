import { LinkNode } from "../../链表/设计链表/linkList";

/**
 * ts 实现的数据结构： 栈
 * 如果要做类型限制，可传泛型
 * const stack = new Stack<any>();
 */
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
        if (this.isEmpty()) throw new Error('栈空');
        return this.items.pop();
    }
    /**
     * 获取栈顶元素
     * @returns 
     */
    peek() {
        if (this.isEmpty()) throw new Error('栈空');
        return this.items[this.items.length - 1];
    }
    /**
     * 判空
     * @returns 
     */
    isEmpty() {
        return this.items.length === 0;
    }
     /**
     * 获取栈元素的个数
     * @returns 
     */
    getSize() {
        return this.items.length;
    }
}

// 链表栈
export class LinkStack {
    // 栈的长度
    size: number;
    // 栈顶指针
    top: LinkNode | null;
    constructor() {
        this.size = 0;
        this.top = null;
    }
    /**
     * 入栈
     * @param item 
     */
    push(val) {
        let node = new LinkNode(val);
        if (this.top === null) { // 栈空
            this.top = node
        } else { // 栈非空
            node.next = this.top
            this.top = node
        } 
        this.size = this.size + 1;
    }
    /**
     * 出栈
     * @returns 
     */
    pop() {
        if (this.top === null) { // 栈空
            throw new Error('栈空');
        } else { // 栈非空
            const data = this.top.val // 栈顶元素值
            this.top = this.top.next // 新栈顶
            this.size = this.size - 1;
            return data
        } 
    }
    /**
     * 获取栈顶元素
     * @returns 
     */
    peek() {
        if (this.top === null) { // 栈空
            throw new Error('栈空');
        } else { 
                return this.top.val;
        }
    }
    /**
     * 判空
     * @returns 
     */
    isEmpty() {
        return this.top === null;
    }
    /**
     * 获取栈元素的个数
     * @returns 
     */
    getSize() {
        return this.size;
    }
}