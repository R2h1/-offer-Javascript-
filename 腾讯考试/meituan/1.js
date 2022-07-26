// var n = readInt(),
//     m = readInt()

// var inputMatrix = []
// for (let i = 0; i < n; i++) {
//     let rowArray = []
//     for (let j = 0; j < m; j++) {
//         rowArray.push(readInt())
//     }
// }

var n = 6, m = 3
inputMatrix = [
    [1, 0, 1],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 1]]
    
function minMatrix(matrix, row) {
    let i = row
    while (i % 2 === 0) {
        let j = i / 2
        let matrix1 = matrix.slice(0, j)  // 前j个
        let matrix2 = matrix.slice(j)      // 后 j 个
        // 翻转
        let tmp = matrix2[0]
            matrix2[0] = matrix2[j-1],
            matrix2[j-1] = tmp
        if (isEq(matrix1, matrix2)) {
            matrix = matrix1
            i = j
        } else {
            break
        }
    }
    return matrix
}


function isEq(matrix1, matrix2) {
    let row1 = matrix1.length,
        col1 = matrix1[0].length
    for (let i = 0; i < row1; i++) {
        for (let j = 0; j < col1; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return false
            }
        }
    }
    return true

}

var res = minMatrix(inputMatrix, n),
    row = res.length
for (let i = 0; i < row; i++) {
    console.log(...res[i])
}