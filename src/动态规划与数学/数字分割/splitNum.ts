/**
 * 对浮点数进行千分位分割
 * @param num 有效浮点数
 * @param divide 分割符号
 * @returns
 */
export function splitNum(num: number, divide = '.') {
  num = Number(num);
  if (isNaN(num)) {
    throw new TypeError('num 必须是一个有效数字');
  }
  let s = (num || 0).toString();
  let sign = '';
  // 处理负数
  if (s[0] === '-') {
    s = s.substring(1);
    sign = '-';
  }
  // 处理小数点
  const pointIdx = s.indexOf('.');
  let res = '';
  if (pointIdx !== -1) {
    res = s.substring(pointIdx);
    s = s.substring(0, pointIdx);
  }
  while (s.length > 3) {
    res = divide + s.substring(s.length - 3);
    s = s.substring(0, s.length - 3);
  }
  return sign + s + res;
}
