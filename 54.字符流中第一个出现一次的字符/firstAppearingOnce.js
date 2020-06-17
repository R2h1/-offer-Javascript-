/*
请实现一个函数用来找出字符流中第一个只出现一次的字符。
例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。
当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。
输出描述:
如果当前字符流没有存在出现一次的字符，返回#字符。
*/

//Init module if you need
function Init()
{
    let helpMap = {}
    this.hash = helpMap
    // write code here
}
//Insert one char from stringstream
function Insert(ch)
{
    if (this.hash[ch]) {
        this.hash[ch]++
    } else {
        this.hash[ch] = 1
    }
    // write code here
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce()
{
    for (let i in this.hash) {
        if (this.hash[i] === 1) {
            return i
        }
    }
    return '#'
    // write code here
}

module.exports = {
	Init : Init,
    Insert : Insert,
    FirstAppearingOnce: FirstAppearingOnce
};