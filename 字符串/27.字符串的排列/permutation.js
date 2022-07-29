/*
输入一个字符串,按字典序打印出该字符串中字符的所有排列。
例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
输入描述:
    输入一个字符串,长度不超过9(可能有字符重复),字符只包括大小写字母。
*/

function Permutation(str)
{
    let len = str.length
    if (len === 0) {
        return []
    }
    if (len === 1) {
        return [str]
    }
    let res = []
    for (let i = 0;i < len;i++) {
        let subRes = Permutation(str.slice(0,i) + str.slice(i+1))
        for (let j = 0;j < subRes.length;j++) {
            subRes[j] += str[i]
        }
        res.push(...subRes)
    }
    return [...new Set(res)]
    // write code here
}


var str = 'abc'
console.log(Permutation(str))