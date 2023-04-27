/**
 * 将一维数组按指定大小切分成二维数组。如果数组不能被平均分割，最后的块将是剩余的元素。
 * @param {Array} array
 * @param {number} size
 * @returns {Array}
 * @example
 *  myChunk([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
 *  myChunk([1, 2, 3, 4, 5, 6, 7, 8], 4); // [[1, 2, 3, 4], [5, 6, 7, 8]]
 */
export function myChunk<T>(array: T[], size = 1): T[][] {
  const result: T[][] = [];
  if (size < 1) {
    return result;
  }
  const len = array.length;
  for (let i = 0; i < len; i = i + size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
