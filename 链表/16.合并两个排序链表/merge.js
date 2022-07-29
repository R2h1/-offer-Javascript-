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
    // 尾插法
    this.insertTail = function(node) {
        let tail = this.head
        while (tail.next !== null) {
            tail = tail.next
        }
        tail.next = node
    }
}

// 构造新链表，两个链表中的较小值插入新链表末尾
// 循环完某一链表后，将另一链表剩下的部分直接加入到新链表末尾
function merge1(pHead1, pHead2) {
    if (pHead1 === null || pHead2 === null) {
        return pHead1 || pHead2
    }
    let newHead = new ListNode(-1),
        current = newHead
    while (pHead1 !== null && pHead2 !== null) {
        if (pHead1.val <= pHead2.val) {
            current.next = pHead1
            pHead1 = pHead1.next
        } else {
            current.next = pHead2
            pHead2 = pHead2.next
        }
        current = current.next
    }
    current.next = pHead1 === null ? pHead2 : pHead1
    return newHead.next
}

//递归
function merge2(pHead1, pHead2) {
    if (pHead1 === null || pHead2 === null) {
        return pHead1 || pHead2
    }
    let resHead = null
    if (pHead1.val <= pHead2.val) {
        resHead = pHead1
        resHead.next = merge2(pHead1.next, pHead2)
    } else {
        resHead = pHead2
        resHead.next = merge2(pHead2.next, pHead1)
    }
    return resHead
}

var list1 = new linkList()
var list2 = new linkList()
list1.head = new ListNode(0)
list2.head = new ListNode(0)
for (let i = 1; i < 11; i++) {
    if (i < 6) {
        list1.insertTail(new ListNode(i))
    } else {
        list2.insertTail(new ListNode(i))
    }
}

console.log(merge2(list1.head, list2.head))