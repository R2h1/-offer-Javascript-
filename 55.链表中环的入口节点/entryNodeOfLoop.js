/*
给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。
*/
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop1(pHead)
{
    let helpMap = new Map()
    while (pHead !== null) {
        if (helpMap.has(pHead)) {
            return pHead
        } 
        helpMap.set(pHead)
        pHead = pHead.next
    }
    return null
    // write code here
}

function EntryNodeOfLoop2(pHead)
{
    let slow = pHead,
        fast = slow
    while (fast !== null && fast.next !== null) {
        slow = slow.next 
        fast = fast.next.next
        if (fast === slow) {
            fast = pHead
            while (slow !== fast) {
                slow = slow.next
                fast = fast.next
            }
            return slow
        }
    }
    return null
    // write code here
}