/**
 * 创建一个对象，该对象由通过 iteratee 运行集合的每个元素的结果生成的键组成。每个key对应的值为iteratee返回该key的次数。
 * @param {Array | Object} collection
 * @param {Function} iteratee
 * @example
 *   countBy([6.1, 4.2, 6.3], Math.floor); // { '4': 1, '6': 2 }
 *   countBy(['one', 'two', 'three'], 'length'); // { '3': 2, '5': 1 }
 */
export function countBy<T>(
  collection: T[],
  iteratee: string | ((value: T) => any)
): {
  [propName: string]: number;
} {
  if (typeof iteratee === 'string') {
    iteratee = (value: T) => {
      //@ts-ignore
      return value[iteratee];
    };
  }
  const result: AnyObject = {};
  for (const item of collection) {
    const key = iteratee(item);
    const val = result[key];
    if (val) {
      result[key] = val + 1;
    } else {
      result[key] = 1;
    }
  }
  return result;
}
