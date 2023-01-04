/**
 * 题目描述：
 *      给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 *  分析：
 */

export function multiply(num1: string, num2: string): string {
  let len1 = num1.length;
  let len2 = num2.length;
  const res = Array(len1 + len2).fill(0);
  for (let i = len2 - 1; i >= 0; i--) {
    const x = num2[i];
    for (let j = len1 - 1; j >= 0; j--) {
      const y = num1[j];
      const sum = res[i + j + 1] + Number(x) * Number(y);
      res[i + j + 1] = sum % 10;
      res[i + j] = res[i + j] + Math.floor(sum / 10);
    }
  }
  return res.join('').replace(/^0+/, '') || '0';
}
