import { isMatrix } from '../../动态规划与数学/最小路径和/minPathSum';

const matrix = [
  [0, 2, 2, 0],
  [0, 0, 2, 2],
  [2, 4, 4, 2],
  [2, 4, 4, 4],
];

type Direction = 'up' | 'right' | 'down' | 'left';

export function move(matrix: number[][], direction: Direction) {
  if (!isMatrix(matrix)) {
    throw new TypeError('matrix 必须是行列均不小于1的二维数组');
  }
  const rows = matrix.length;
  const cols = matrix[0].length;

  /**
   * 判断下标是否在范围内
   * @param i
   * @param j
   * @returns
   */
  function isValidIndex(i: number, j: number) {
    return matrix[i] && matrix[i][j] !== undefined;
  }

  const next = {
    up: (i: number, j: number) => [i + 1, j],
    left: (i: number, j: number) => [i, j + 1],
    down: (i: number, j: number) => [i - 1, j],
    right: (i: number, j: number) => [i, j - 1],
  };
  /**
   * 找 direction 方向上的下一个非 0 的值
   * @param i
   * @param j
   * @returns
   */
  function getNextNonZeroValue(i: number, j: number) {
    let [nextI, nextJ] = next[direction](i, j);
    while (isValidIndex(nextI, nextJ)) {
      const nextValue = matrix[nextI][nextJ];
      if (nextValue) {
        return [nextI, nextJ, nextValue];
      }
      [nextI, nextJ] = next[direction](nextI, nextJ);
    }
  }
  /**
   * 计算一个方向上某一行或者某一列的值
   * @param i
   * @param j
   * @returns
   */
  function cal(i: number, j: number) {
    // 不在范围内
    if (!isValidIndex(i, j)) return;
    // 下一个非 0 的值
    const result = getNextNonZeroValue(i, j);
    if (!result) {
      return;
    }
    const [nextI, nextJ, nextValue] = result;
    if (matrix[i][j] === 0) {
      // 当前值为 0
      matrix[i][j] = nextValue;
      matrix[nextI][nextJ] = 0;
      cal(i, j); // 需要再一次
    } else if (matrix[i][j] === nextValue) {
      matrix[i][j] = matrix[i][j] + nextValue;
      matrix[nextI][nextJ] = 0;
    }
    // 计算下一个位置的值
    cal(...(next[direction](i, j) as [number, number]));
  }

  if (direction === 'up') {
    // 向上
    for (let j = 0; j < cols; j++) {
      cal(0, j);
    }
  } else if (direction === 'left') {
    // 向左
    for (let i = 0; i < rows; j++) {
      cal(i, 0);
    }
  } else if (direction === 'down') {
    // 向下
    for (let j = 0; j < cols; j++) {
      cal(rows - 1, j);
    }
  } else {
    // 向右
    for (let i = 0; i < rows; j++) {
      cal(i, cols - 1);
    }
  }
}
