/*
请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。
路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。
如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。 
例如 
[
 [a b c e],
 [s f c s],
 [a d e e]
]
矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，
因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。
*/
function hasPath(matrix, path) {
    let rows = matrix.length
    if (rows === 0) return false
    let cols = matrix[0].length
    if (cols === 0) return false
    let pathIdx = 0,
        visited = new Array(rows * cols)
    for (let i = 0; i < rows;i++) {
        for (let j = 0;j < cols;j++) {
            if (hasPathCore(matrix, rows, cols, i, j, path, pathIdx, visited)) {
                return true
            }
        }
    }
    return false
};


function hasPathCore(matrix, rows, cols, row, col, path, pathIdx, visited) {
    let isHasPath = false,
        curIdx = row * cols + col
    if (row >= 0 && row < rows && col >= 0 && col < cols && visited[curIdx] === false) {
        if (matrix[row][col] === path[pathIdx]) {
            if (pathIdx === path.length - 1) {
                isHasPath = true
            } else {
                isHasPath = 
                    hasPathCore(matrix, rows, cols, row - 1, col, path, pathIdx, visited) ||
                    hasPathCore(matrix, rows, cols, row, col - 1, path, pathIdx, visited) ||
                    hasPathCore(matrix, rows, cols, row + 1, col, path, pathIdx, visited) ||
                    hasPathCore(matrix, rows, cols, row, col + 1, path, pathIdx, visited)   
            }
            visited[curIdx] = isHasPath
        }
    }
    return isHasPath
}
​	