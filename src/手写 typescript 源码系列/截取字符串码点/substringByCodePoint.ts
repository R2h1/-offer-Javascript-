/**
 * 按代码点截取 [start, end) 之间的子字符串
 * @param str 原始字符串
 * @param start 代码点起始位置
 * @param end 代码点结束位置
 * @returns
 */
export function substringByCodePoint(str: string, start = 0, end = codePointLength(str)): string {
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

/**
 * 获取字符串的代码点长度，即实际能看到的字符串长度
 * @param str 字符串
 * @returns
 */
export function codePointLength(str: string): number {
  const len = str.length; // 码元长度
  let res = 0;
  let i = 0;
  while (i < len) {
    const codePoint = str.codePointAt(i) as number;
    i += codePoint > 0xffff ? 2 : 1;
    res += 1;
  }
  return res;
}

/**
 * 按代码点下标获取字符
 * @param str 字符串
 * @param index 代码点下标
 * @returns
 */
export function codePointAt(str: string, index: number): string | undefined {
  const len = str.length;
  let curIndex = 0;
  let i = 0;
  while (i < len) {
    const codePoint = str.codePointAt(i) as number;
    if (curIndex === index) {
      return String.fromCodePoint(codePoint);
    }
    i += codePoint > 0xffff ? 2 : 1;
    curIndex += 1;
  }
}
