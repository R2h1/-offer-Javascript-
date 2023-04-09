/**
 *
 * @param {number} count 评分数
 * @returns {string} 评分字符串
 * @example
 * rate(0); // '☆☆☆☆☆'
 * rate(1); // '★☆☆☆☆'
 * rate(2); // '★★☆☆☆'
 * rate(3); // '★★★☆☆'
 * rate(4); // '★★★★☆'
 * rate(5); // '★★★★★'
 */
export function rate(count: number) {
  if (count < 0) {
    count = 0;
  }
  if (count > 5) {
    count = 5;
  }
  return '★★★★★☆☆☆☆☆'.substring(5 - count, 10 - count);
}
