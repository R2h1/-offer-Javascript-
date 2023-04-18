type SumType = 'odd' | 'even';
/**
 * 求从 k 开始的前 n 个奇数或者偶数和（等差数列, 公差为 2）
 * @param start
 * @param end
 * @param type
 * @returns
 */
export function frontNSum(start: number, end: number, type: SumType) {
  if (type === 'odd') {
    start = start % 2 ? start + 1 : start;
  } else {
    start = start % 2 ? start : start + 1;
  }
  return (start + (end - 1)) * end;
}

/**
 * 求从 k ~ n 的奇数或者偶数和
 * @param start
 * @param end
 * @param type
 * @returns
 */
export function NSum(start: number, end: number, type: SumType) {
  if (type === 'odd') {
    start = start % 2 ? start + 1 : start;
    end = end % 2 ? end - 1 : end;
  } else {
    start = start % 2 ? start : start + 1;
    end = end % 2 ? end : end - 1;
  }
  return (((end - start) / 2 + 1) * (start + end)) / 2;
}
