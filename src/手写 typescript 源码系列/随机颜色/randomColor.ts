/**
 * 获取一个随机的 Hex 颜色字符串
 * @returns
 */
export default function randomColor() {
  return '#' + Math.random().toString(16).substring(2, 8).padEnd(6, '0');
}
