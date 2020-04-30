/*
在一个二维数组中（每个一维数组的长度相同），
每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
*/
// 优化的暴力方法
function Find(target, array) {
    let row = array.length,
        col = array[0].length
    if (row === 0 || col === 0) {
        return false
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (array[i][j] === target) {
                return true
            } else if (array[i][j] < target) {
                continue
            } else {
                break
            }
        }
    }
    return false
}
//考虑递增，可以采用行列递减的方式查找
//就以左下角元素为起点开始查找
function Find(target, array) {
    let row = array.length,
        col = array[0].length
    if (row === 0 || col === 0) {
        return false
    }
    let i = row - 1,
        j = 0
    while (i >= 0 && j < col) {
        if (array[i][j] == target) {
            return true
        } else if (array[i][j] < target) {
            // move right
            j++
        } else {
            // move up
            i--
        }
    }
    return false
}

let matrix = [
    [1, 2, 8, 9],
    [2, 4, 9, 12],
    [4, 7, 10, 13],
    [6, 8, 11, 15]
]
console.log(Find(7, matrix))