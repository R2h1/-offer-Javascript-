/*
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），
请对此链表进行深拷贝，并返回拷贝后的头结点。
（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
*/
function RandomListNode(x) {
    this.label = x;
    this.next = null;
    this.random = null;
}

function Clone(pHead) {
    if (pHead === null) {
        return null
    }
   
    let currNode = pHead
    while (currNode !== null) {
        let node = new RandomListNode(currNode.label)
        node.next = currNode.next
        currNode.next = node
        currNode = node.next
    }

    
    currNode = pHead
    while (currNode !== null && currNode.next !== null) {
        if (currNode.random !== null) {
            currNode.next.random = currNode.random.next
        }
        currNode = currNode.next.next
    }

    
    let pCloneHead = pHead.next
    currNode = pHead
    while (currNode.next !== null) {
        let tmp = currNode.next
        currNode.next = tmp.next
        currNode = tmp
    }
    return pCloneHead
}