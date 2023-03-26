/**
 * 题目描述：
 *     实现数组元素的去重
 */

function unique(array: unknown[]) {
  if (!Array.isArray(array)) {
    throw new TypeError(`params must be a array, but you give a ${typeof array}`);
  }
  const result: unknown[] = [];
  const map = new Map<string, boolean>();
  for (let item of array) {
    // 如果当前 item 是数组，先排序
    if (Array.isArray(item)) item.sort((a, b) => a - b);
    // 如果是 plain object, 按 key 进行排序
    if (Object.prototype.toString.call(item) === '[object Object]') {
      item = Object.keys(item)
        .sort()
        .reduce((acc, key) => {
          acc[key] = item[key];
          return acc;
        }, {} as any);
    }
    // 生成 一个标识该 item 的 key
    const key = typeof item + JSON.stringify(item);
    if (!map.has(key)) {
      result.push(item);
      map.set(key, true);
    }
  }
  return result;
}

export { unique };
