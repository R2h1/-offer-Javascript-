/*
输入一个链表，输出该链表中倒数第k个结点
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
// 额外数组
function FindKthToTail(head, k) {
    if (head === null || k === 0) {
        return null
    }
    let nodeArr = [],
        node = head
    while (node !== null) {
        nodeArr.push(node)
        node = node.next
    }

    return nodeArr.length < k ? null : nodeArr[nodeArr.length - k]
    // write code here
}
//直接在链表上操作
function FindKthToTail2(head, k) {
    if (head === null || k === 0) {
        return null
    }
    let node = head,
        len = 0
    //get the length of linkList
    while (node !== null) {
        len++
        node = node.next
    }
    if (len < k) {
        return null
    } else {
        node = head
        k = len - k
        while (k !== 0) {
            k--
            node = node.next
        }
        return node
    }
    // write code here
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
console.log(FindKthToTail2(list.head, 1))