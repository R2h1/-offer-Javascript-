/*
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型
*/

function Queue1() {
    this.stack1 = [] // in stack
    this.stack2 = [] // out stack
}

Queue1.prototype.push = function(val) {
    this.stack1.push(val)
}

Queue1.prototype.pop = function() {
    if (this.stack1.length === 0 && this.stack2.length === 0) {
        throw new Error('Queue is empty!')
        return
    }
    if (this.stack2.length === 0) {
        while (this.stack1.length !== 0) {
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.pop()
}

class Queue2 {
    constructor() {
        this.stack1 = []
        this.stack2 = []
    }
    push(val) {
        this.stack1.push(val)
    }
    pop() {
        if (this.stack1.length === 0 && this.stack2.length === 0) {
            throw new Error('Queue is empty!')
            return
        }
        if (this.stack2.length === 0) {
            while (this.stack1.length !== 0) {
                this.stack2.push(this.stack1.pop())
            }
        }
        return this.stack2.pop()
    }
}
//原型链
var queue1 = new Queue1()
queue1.push(1)
queue1.push(2)
queue1.push(3)
console.log(queue1.pop())
console.log(queue1.pop())
queue1.push(4)
console.log(queue1.pop())
//class
var queue2 = new Queue2()
queue2.push(1)
queue2.push(2)
queue2.push(3)
console.log(queue2.pop())
queue2.push(4)
console.log(queue2.pop())