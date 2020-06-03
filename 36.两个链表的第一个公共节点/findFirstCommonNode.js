/*
输入两个链表，找出它们的第一个公共结点。
（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）
*/

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function GetLinkedListLength(pHead) {
    let node = pHead,
        len = 0;
    while (node !== null) {
        node = node.next;
        len++;
    }
    return len;
}
function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    let len1 = GetLinkedListLength(pHead1),
        len2 = GetLinkedListLength(pHead2),
        diff = Math.abs(len2 - len1)
    let pShort = len1 < len2 ? pHead1 : pHead2,
        pLong = len1 < len2 ? pHead2 : pHead1
    for (let i = 0;i < diff;i++) {
        pLong = pLong.next
    }
    while (pShort !== null && pLong !== null && pLong !== pShort) {
        pShort = pShort.next
        pLong = pLong.next
    }
    return pLong
}

