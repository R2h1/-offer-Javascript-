/*
输入一个链表，按链表从尾到头的顺序返回一个ArrayList
*/

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
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