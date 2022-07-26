/*
计算数字K 在 0 到 n 出现的次数
比如 n= 12, k = 1
出现 5 次 ： 1 ， 10， 11， 12
*/
const calKCountOfN = function(n, k) {
    let count = 0,
        strK = k.toString()
    for (let i = 0; i <= n; i++) {
        let strI = i.toString()
        let lenI = strI.length
        for (let j = 0; j < lenI; j++) {
            if (strI[j] === strK) {
                count++
            }
        }
    }
    return count
}

var n = 12,
    k = 1
console.log(calKCountOfN(n,k))