/*
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字
例如，如果输入如下4 X 4矩阵： 
    1  2  3  4 
    5  6  7  8 
    9  10 11 12 
    13 14 15 16 
则依次打印出数字
    1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.
*/
// 左->右，上->下 右->左 下->上
function printMatrix(matrix) {
    // write code here
    let row = matrix.length
    if (row === 0) {
        return [].join('')
    }
    let col = matrix[0].length
    if (col === 0) {
        return [].join('')
    }
    let res = [],
        start = 0
    while (start * 2 < row && start * 2 < col) {
        print(matrix, row, col, start, res)
        start++
    }
    return res.join(',')
}

function print(matrix, row, col, start, res) {
    let endCol = col - start - 1,
        endRow = row - start - 1
    for (let i = start; i <= endCol; i++) {
        res.push(matrix[start][i])
    }
    for (let i = start + 1; i <= endRow; i++) {
        res.push(matrix[i][endCol])
    }
    if (start < endRow) {
        for (let i = endCol - 1; i >= start; i--) {
            res.push(matrix[endRow][i])
        }
    }
    if (start < endCol) {
        for (let i = endRow - 1; i > start; i--) {
            res.push(matrix[i][start])
        }
    }
}



//始终移除第一行 + 变相转置
function printMatrix2(matrix) {
    let row = matrix.length
    if (row === 0) {
        return [].join('')
    }
    let col = matrix[0].length
    if (col === 0) {
        return [].join('')
    }
    let res = []
    while (matrix.length) {
        let firstRow = matrix.shift()
        res.push(...firstRow)
        matrix = transpose(matrix)
    }
    return res.join(',')
}

function transpose(matrix) {
    if (!matrix.length) {
        return []
    }
    let res = [],
        col = matrix.length,
        row = matrix[0].length
    for (let i = row - 1; i >= 0; i--) {
        let tmp = []
        for (let j = 0; j < col; j++) {
            tmp.push(matrix[j][i])
        }
        res.push(tmp)
    }
    return res
}
var matrix = [],
    row = 4,
    col = 4
for (let i = 1; i <= row; i++) {
    let arr = []
    for (let j = 1; j <= col; j++) {
        arr.push((i - 1) * col + j)
    }
    matrix.push(arr)
}
console.log(printMatrix2(matrix))