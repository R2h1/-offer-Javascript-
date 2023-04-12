// 洗牌算法(打乱的更完全)
export function shuffle1(array: number[]): number[] {
  const len = Array.isArray(array) ? array.length : 0;
  if (len === 0) {
    return [];
  }
  let index = 0;
  let lastIndex = len - 1;
  const result = array.slice();
  while (index < len) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    [result[rand], result[index]] = [result[index], result[rand]];
    index = index + 1;
  }
  return result;
}

// 随机数排序
export function shuffle2(arr: number[]): number[] {
  return arr.sort(() => 0.5 - Math.random());
}
