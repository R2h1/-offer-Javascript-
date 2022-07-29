/*
输入一个链表，反转链表后，输出新链表的表头。
*/

function ListNode(x) {
    this.val = x
    this.next = null
}

function linkList() {
    this.head = null
    //头插法
    this.insertHead = function(node) {
        let oldHead = this.head
        this.head = node
        this.head.next = oldHead
    }
    this.insertTail = function(node) {
        let tail = this.head
        while (tail.next !== null) {
            tail = tail.next
        }
        tail.next = node
    }
}
//假设现在到了节点i（pHead),首先拿到下一个节点(nextNode)。然后将i节点的next指向前一个节点（pre）
//然后让pre指向pHead,pHead指向nextNode
function ReverseList(pHead) {
    // write code here
    if (pHead === null || pHead.next === null) {
        return pHead
    }
    let pre = null;
    while (pHead !== null) {
        nextNode = pHead.next
        pHead.next = pre
        pre = pHead
        pHead = nextNode
    }
    return pre
}

var list = new linkList()
var node1 = new ListNode(1)
var node2 = new ListNode(2)
var node3 = new ListNode(3)
var node4 = new ListNode(4)
var node5 = new ListNode(5)

list.head = node1
list.insertTail(node2)
list.insertTail(node3)
list.insertTail(node4)
list.insertTail(node5)

console.log(ReverseList(list.head))