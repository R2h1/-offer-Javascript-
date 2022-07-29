/*
定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
注意：保证测试中不会当栈为空的时候，对栈调用pop()或者min()或者top()方法。
*/

function HaveMinStack() {
    this.dataStack = []
    this.minStack = []
    this.length = 0
}

HaveMinStack.prototype.push = function(value) {
    this.dataStack.push(value)
    if (this.length === 0 || this.minStack[this.length - 1] > value) {
        this.minStack.push(value)
    } else {
        this.minStack.push(this.minStack[this.length - 1])
    }
    this.length = this.length + 1
}
HaveMinStack.prototype.pop = function() {
    if (this.length === 0) {
        return null
    }
    this.length = this.length - 1
    this.minStack.pop()
    return this.dataStack.pop()
}
HaveMinStack.prototype.top = function() {
    if (this.length === 0) {
        return null
    }
    return this.dataStack[this.length - 1]
}
HaveMinStack.prototype.min = function() {
    if (this.length === 0) {
        return null
    }
    return this.minStack[this.length - 1]
}

var stack = HaveMinStack()
stack.push(5)
stack.push(6)
stack.push(1)
console.log(stack.pop())
console.log(stack.pop())
stack.push(7)
console.log(stack.min())
console.log(stack)