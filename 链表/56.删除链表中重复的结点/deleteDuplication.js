/*
在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 
例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
*/
function ListNode(x){
    this.val = x;
    this.next = null;
}
function deleteDuplication1(pHead)
{
   if(pHead === null || pHead.next === null) {
        return pHead;
    }
    let p = pHead;
    if(pHead.val === p.next.val) { // 第一个节点是重复节点
        p = p.next.next;
        while(p !== null && p.val === pHead.val) {
            p = p.next;
        }
        return deleteDuplication(p)
    }else {   // 第一个节点不是重复节点
        p = pHead.next;
        pHead.next = deleteDuplication(p);
        return pHead;
    }
    // write code here
}

function deleteDuplication2(pHead)
{
    if (pHead === null || pHead.next === null) return pHead
    let Head = new ListNode(-1)
    Head.next = pHead
    let pre  = Head,
        last = Head.next
    while (last !== null){
        if(last.next !== null && last.val === last.next.val){
            // 找到最后的一个相同节点
            while (last.next!=null && last.val === last.next.val){
                last = last.next
            }
            pre.next = last.next
            last = last.next
        }else{
            pre = pre.next
            last = last.next
        }
    }
    return Head.next
    // write code here
}