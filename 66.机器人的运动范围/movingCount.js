/*
地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，
每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 
例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。
但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？
*/

// 计算一个数各位数字之和
function sumOfEvery(num) {
    let sum = 0
    while (num > 0) {
        sum += num % 10
        num = Math.floor(num / 10)
    }
    return sum
}
// 判断方格合法性
function isValid(rows, cols, row, col) {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        return true
    }
    return false
}
//判断方格下标数字之和是否不大于k
function compare(k,row,col) {
    if (sumOfEvery(row) + sumOfEvery(col) <= k){
        return true
    }
    return false
}
// 判断当前方格是否能访问
function isVisited(visited,cols,row,col) {
    if (visited[row * cols + col]) {
        return false
    }
    return true
    
}
// 判断是否能进入该方格
function isEnter(threshold, rows, cols, row, col, visited) {
    if(isValid(rows, cols, row, col) && compare(threshold,row,col) && isVisited(visited,cols,row,col)) {
        return true
    }
    return false
}
// 创建一个给定长度和初始值的一维数组
function createArray(l, value) {
    let arr = []
    for (let i = 0;i < l;i++) {
        arr.push(value)
    }
    return arr
}

function movingCountCore(threshold, rows, cols,row,col,visited)
{
    let count = 0,
        curIdx = row * cols + col
    if (isEnter(threshold, rows, cols, row, col,visited)) {
        visited[curIdx] = true
        count = 1 + movingCountCore(threshold, rows, cols, row - 1, col, visited) +
                    movingCountCore(threshold, rows, cols, row, col - 1, visited) +
                    movingCountCore(threshold, rows, cols, row + 1, col, visited) +
                    movingCountCore(threshold, rows, cols, row, col + 1, visited) 
    }
    return count
    // write code here
}

function movingCount(threshold, rows, cols)
{
    if (rows < 1 || cols < 1 || threshold < 0) {
        return 0
    }
    let len = rows * cols,
        visited = createArray(len,false)
    return movingCountCore(threshold,rows,cols,0,0,visited)
    // write code here
}

var m = 7,
    n = 5,
    k = 4
console.log(movingCount(k,m,n))