/**
 * 实现 assign
 * @param p
 * @returns
 */
function myAssign(target: object, ...source: any[]) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  const ret = Object(target);
  source.forEach(function (obj) {
    if (obj != null) {
      // 非 null 和 非 undefined
      for (let key in obj) {
        // 可枚举属性
        if (obj.hasOwnProperty(key)) {
          // 自有属性
          ret[key] = obj[key]; // 使用后面的覆盖前面的
        }
      }
    }
  });
  return ret;
}
