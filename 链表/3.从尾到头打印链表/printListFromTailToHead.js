/*
输入一个链表，按链表从尾到头的顺序返回一个ArrayList
*/

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ListNode(x) {
    this.val = x
    this.next = null
}

function linkList() {
    this.head = null
    // the way of head insert 
    this.insert = function(node) {
        let oldHead = this.head
        this.head = node
        this.head.next = oldHead
    }
}

function printListFromTailToHead(head) {
    // write code here
    let node = head,
        res = []
    while (node !== null) {
        res.push(node.val)
        node = node.next
    }
    /*
    for(let i = res.length-1; i>=0; --i) {
        console.log(res[i])
    }
    */
    return res.reverse()
}

var list = new linkList()
var node1 = new ListNode(1)
var node2 = new ListNode(2)
var node3 = new ListNode(3)

list.head = node1
list.insert(node2)
list.insert(node3)
console.log(printListFromTailToHead(list.head))