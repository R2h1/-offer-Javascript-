/**
 * 按代码点截取 [start, end) 之间的子字符串
 * @param str 原始字符串
 * @param start 代码点起始位置
 * @param end 代码点结束位置
 * @returns
 */
export function substringByCodePoint(str: string, start: number, end: number): string {
  const strLen = str.length;
  let result = '';
  let codePointIndex = 0; // 代码点索引
  let codeUnitIndex = 0; // 代码单元索引（即字符串下标）
  while (codeUnitIndex < strLen && codePointIndex < end) {
    const codePoint = str.codePointAt(codeUnitIndex) as number;
    if (codePointIndex >= start) {
      result = result + String.fromCodePoint(codePoint);
    }
    codePointIndex = codePointIndex + 1;
    if (codePoint <= 0xffff) {
      // 代码单元（16位表示，一个 f 即 4 位）
      codeUnitIndex = codeUnitIndex + 1;
    } else {
      // 代码点（32位表示）
      codeUnitIndex = codeUnitIndex + 2;
    }
  }
  return result;
}
