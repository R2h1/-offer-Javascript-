/**
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。
 * 则可以认为该短语是一个回文串。
 * 字母和数字都属于字母数字字符。
 * 给你一个字符串str，如果它是回文串，返回 true；否则，返回false。
 * @param {string} str 待验证的字符串
 * @returns 是否是回文串
 */
export function isPalindrome(str: string): boolean {
  let right = str.length - 1;
  let left = 0;
  const isValidChar = (char: string): boolean => {
    return /[0-9a-zA-Z]/.test(char);
  };
  while (left < right) {
    while (!isValidChar(str[left]) && left < right) {
      left = left + 1;
    }
    while (!isValidChar(str[right]) && left < right) {
      right = right - 1;
    }
    if (left < right) {
      if (str[left].toLowerCase() !== str[right].toLowerCase()) {
        return false;
      } else {
        left = left + 1;
        right = right - 1;
      }
    }
  }
  return true;
}
