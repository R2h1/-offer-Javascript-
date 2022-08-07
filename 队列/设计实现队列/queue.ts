import { LinkNode } from "../../链表/设计链表/linkList";

/**
 * 设计实现队
 */
// 数组实现顺序队列
export class ArrayQueue<T> {
    items: T[];
    constructor() {
        this.items = [];
    }
    /**
     * 入队
     * @param item 
     */
    push(item: T) {
        this.items.push(item);
    }
    /**
     * 出队
     * @returns 
     */
    pop() {
        if (this.isEmpty()) throw new Error('队列空');
        return this.items.shift();
    }
    /**
     * 获取队顶元素
     * @returns 
     */
    peek() {
        if (this.isEmpty()) throw new Error('队列空');
        return this.items[0];
    }
    /**
     * 判空
     * @returns 
     */
    isEmpty() {
        return this.items.length === 0;
    }
     /**
     * 获取队元素的个数
     * @returns 
     */
    getSize() {
        return this.items.length;
    }
}

// 链表顺序队列
export class LinkQueue {
    // 队的长度
    size: number;
    // 队尾指针
    head: LinkNode | null;
    // 队尾指针
    tail: LinkNode | null;
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    /**
     * 入队
     * @param item 
     */
    enQueue(val) {
        let node = new LinkNode(val);
        if (this.size === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = this.tail!.next
        }
        this.size = this.size + 1;
    }
    /**
     * 出队
     * @returns 
     */
    deQueue() {
        if (this.size === 0) { // 队空
            throw new Error('队空');
        } else { // 队非空
            const node = this.head;
            this.head = node!.next;
            this.size = this.size - 1;
            return node!.val;
        } 
    }
    /**
     * 获取队头元素
     * @returns 
     */
    peek() {
        if (this.size === 0) { // 队空
            throw new Error('队空');
        } else { 
            return this.head!.val;
        }
    }
    /**
     * 判空
     * @returns 
     */
    isEmpty() {
        return this.size === 0;
    }
    /**
     * 获取队元素的个数
     * @returns 
     */
    getSize() {
        return this.size;
    }
}

// 数组循环队列
export class LoopQueue {
    // 存放元素的数组
    values: number | undefined[]
    // 当前元素个数
    count: number;
    // 队的长度
    capacity: number;
    // 队尾
    head: number;
    // 队尾
    tail: number;
    constructor(capacity: number) {
        this.head = 0;
        this.tail = 0;
        this.capacity = capacity;
        this.count = 0;
        this.values = new Array(capacity);
    }
    /**
     * 入队
     * @param item 
     */
    enQueue(val: number) {
        if (this.isFull()) {
            throw new Error('队满');
        }
        this.values[this.tail] = val;
        this.tail = (this.tail + 1) % this.capacity;
        this.count = this.count + 1;
        return true;
    }
    /**
     * 出队
     * @returns 
     */
    deQueue(): number {
        if (this.isEmpty()) {
            throw new Error('队空')
        }
        const value = this.values[this.head] as number;
        this.values[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.count = this.count - 1;
        return value;
    }
    /**
     * 获取队头元素
     * @returns 
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error('队空')
        }
        const value = this.values[this.head];
        return value;
    }
    /**
     * 判空
     * @returns 
     */
    isEmpty() {
        // 或 return this.head === this.tail  
        return this.count === 0;
    }
    /**
     * 判满
     * @returns 
     */
     isFull() {
        // 或 return this.head === (this.tail + 1) % this.capacity
        return this.count === this.capacity - 1;
    }
    /**
     * 获取队元素的个数
     * @returns 
     */
    getSize() {
        return this.count;
    }
    /**
     * 清空队列
     * @returns 
     */
    clear() {
        this.head = 0   
        this.tail = 0   
        this.count = 0   
        this.values = new Array(this.capacity)
        return true
    }
};