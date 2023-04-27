/**
 * 获取对象路径处的值。如果解析值未定义，则返回 defaultValue 代替它。
 * @param {Object} object
 * @param {Array | String} path
 * @param {Any} defaultValue
 * @example
 *   const object = { 'a': [{ 'b': { 'c': 3 } }] };
 *   get(object, 'a[0].b.c'); // 3
 *   get(object, ['a', '0', 'b', 'c']); // 3
 *   get(object, 'a.b.c', 'default'); // 'default'
 */
export function get(object: AnyObject, path: string[] | string, defaultValue: any) {
  if (typeof path === 'string') {
    const reg = /[^\[\].+]/g;
    path = path.match(reg) || [];
  }
  let obj = object;
  for (const key of path) {
    if (!obj) {
      return defaultValue;
    }
    obj = obj[key];
  }
  return obj === undefined ? defaultValue : obj;
}
