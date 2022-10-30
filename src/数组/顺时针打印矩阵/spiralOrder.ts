/**
 * 题目描述：
 *       输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 * 分析：
 *      分层遍历，每层按从左到右，从上到下，从右到左，从下到上进行遍历打印。从 0层开始，每打印完一层行和列均减去2，因此层数 * 2应该同时小于行数与列数，注意打印到最后一层，如果只剩下一行，则不需要从右到左，同理，只剩下一列，则不需要从下到上。
 *      移除首行 + 变相转置（向左翻转），先将矩阵的第一行打印，对剩下的矩阵进行向左翻转（变相转置），依次打印翻转后的第一行，直到矩阵为空。
 */

// 按层遍历
function spiralOrder1(matrix: number[][]): number[] {
  const row = matrix?.length;
  const col = matrix?.[0]?.length;
  let layer = 0;
  const printResult: number[] = [];
  while (layer * 2 < row && layer * 2 < col) {
    // 每遍历一次，行和列均减去了2，
    const endRowIndex = row - 1 - layer;
    const endColIndex = col - 1 - layer;
    for (let j = layer; j <= endColIndex; j++) {
      // 从左向右
      printResult.push(matrix[layer][j]);
    }
    for (let i = layer + 1; i <= endRowIndex; i++) {
      // 从上到下
      printResult.push(matrix[i][endColIndex]);
    }
    if (layer < endRowIndex) {
      // 排除只剩下一行，不需要从右到左
      for (let i = endColIndex - 1; i >= layer; i--) {
        // 从右到左
        printResult.push(matrix[endRowIndex][i]);
      }
    }
    if (layer < endColIndex) {
      // 排除只剩下一列，不需要从下到上
      for (let j = endRowIndex - 1; j > layer; j--) {
        // 从下到上
        printResult.push(matrix[j][layer]);
      }
    }
    layer = layer + 1;
  }
  return printResult;
}

// 移除首行 + 变相转置（向左翻转）
function spiralOrder2(matrix: number[][]): number[] {
  const printResult: number[] = [];
  function transpose(matrix: number[][]): number[][] {
    const transposedMatrix: number[][] = [];
    const row = matrix?.length;
    const col = matrix?.[0]?.length;
    for (let j = col - 1; j >= 0; j--) {
      const tmp: number[] = [];
      for (let i = 0; i < row; i++) {
        tmp.push(matrix[i][j]);
      }
      transposedMatrix.push(tmp);
    }
    return transposedMatrix;
  }
  while (matrix.length) {
    const firstRow = matrix.shift() as number[];
    printResult.push(...firstRow); // 每次将第一行放入结果数组中
    matrix = transpose(matrix); // 对矩阵进行变相转置（向左翻转）
  }
  return printResult;
}
