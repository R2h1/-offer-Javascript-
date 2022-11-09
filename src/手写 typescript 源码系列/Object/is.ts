/**
 * 实现 Object.is
 *      判断是否三等：
 *          1. 如果三等, 如果其中一个是+0且另一个是-0，则不相等，否则相等。
 *          2. 如果不三等，如果两个都是NaN则相等，否则不相等。
 * @param x
 * @param y
 * @returns
 */
export function is(x: any, y: any) {
  if (x === y) return x !== 0 || y !== 0 || 1 / x === 1 / y;
  else return x !== x && y !== y;
}
