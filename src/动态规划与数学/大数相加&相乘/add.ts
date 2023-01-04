/**
 * 题目描述：
 *      给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 *  分析：
 *      由于最大的安全整数是16位，因此从后往前每15位转换为数字相加并且考虑进位，
 *      然后再将每部分字符串拼接。需要注意的是，某一部分相加的结果如果位数为16位，说明需要进位，
 *      如果位数为小于等于15位时且存在一个加数的位数等于15位，这部分的结果前面需要补0。
 */

export function addStrings(num1: string, num2: string): string {
  let i = num1.length;
  let j = num2.length;
  let res = '';
  let curry = 0;
  const subNum = 15;
  while (i > 0 || j > 0) {
    const subOfNum1 = num1.substring(i - subNum, i);
    const subOfNum2 = num2.substring(j - subNum, j);
    let sum = String(Number(subOfNum1) + Number(subOfNum2) + curry);
    if (sum.length > subNum) {
      res = sum.substring(1) + res;
      curry = 1;
    } else {
      res = i < subNum && j < subNum ? sum + res : sum.padStart(subNum, '0') + res;
      curry = 0;
    }
    j = j - subNum;
    i = i - subNum;
  }
  return curry === 1 ? curry + res : res;
}
