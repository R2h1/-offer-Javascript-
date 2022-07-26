/**
 * 数组全排列
 * 如[1, 2, 3]
 * 全排列为:
 * [[1,2,3], [1, 3, 2],
 * [2, 1, 3],[2, 3, 1],
 *  [3, 1, 2], [3, 2, 1]]
 * */ 


function permutations(arr) {
    // write code here
    let len = arr.length 
    if (len === 1) {
        return [arr]
    }
    let res = []
    for (let i = 0; i < len; i++) {
        let subArr = arr.slice(0, i).concat(arr.slice(i+1))// 子数组
        let subRes = permutations(subArr)
        subRes = subRes.map((item) => {
            return [arr[i]].concat(item)
        })
        res = res.concat(subRes)
    }
    return res
}

let arr = [1, 2, 3]

console.log(permutations(arr))