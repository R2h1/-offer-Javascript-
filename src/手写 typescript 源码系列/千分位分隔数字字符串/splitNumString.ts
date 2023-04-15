/**
 * n位分隔数字字符串（比如千分位分隔数字字符串）
 * @param num
 * @param every
 * @param divide
 * @returns
 */
export function splitNumString(numString: string, every = 3, divide = ','): string {
  // RegExp需要加反斜杠转义反斜杠
  const reg = new RegExp(`(?=\\B(\\d{${every}})+$)`, 'g');
  return numString.replace(reg, divide);
}
