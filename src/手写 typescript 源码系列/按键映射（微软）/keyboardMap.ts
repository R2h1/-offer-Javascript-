/**
 * 根据按下的数字按键，得到所有的字母排列组合
 * @param {string} digits 按下的所有数字按键(2-9)
 * @returns {string[]} 按键的所有排列组合
 */
const digit2CharMap = new Map([
  ['2', ['a', 'b', 'c']],
  ['3', ['d', 'e', 'f']],
  ['4', ['g', 'h', 'i']],
  ['5', ['j', 'k', 'l']],
  ['6', ['m', 'n', 'o']],
  ['7', ['p', 'q', 'r', 's']],
  ['8', ['t', 'u', 'v']],
  ['9', ['w', 'x', 'y', 'z']],
]);
export function keyboardMap(digits: string): string[] {
  let res: string[] = [];
  function _compose(arr1: string[], arr2: string[]): string[] {
    const res = [];
    const len1 = arr1.length;
    if (len1 === 0) return arr2;
    const len2 = arr2.length;
    if (len2 === 0) return arr1;
    for (let i = 0; i < len1; i++) {
      for (let j = 0; j < len2; j++) {
        res.push(arr1[i] + arr2[j]);
      }
    }
    return res;
  }
  const len = digits.length;
  for (let i = 0; i < len; i++) {
    res = _compose(res, digit2CharMap.get(digits[i]) ?? []);
  }
  return res;
}
