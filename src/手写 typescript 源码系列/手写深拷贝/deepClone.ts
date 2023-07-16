/**
 * 未考虑特殊对象和性能优化：考虑数组、循环引用（使用弱引用，避免拷贝对象过大的内存额外消耗）(面试不用写太复杂，否则自己挖坑，用Map就好)
 * @param {*} target 待拷贝对象
 * @param {*} map 循环引用问题，map缓存已拷贝的
 */
export const cloneDeep = function (target: any, map = new WeakMap<object, any>()) {
  if (!isObject(target)) {
    return target;
  }
  // 对象拷贝
  if (map.get(target)) return target; // 拷贝过 return 避免循环引用
  map.set(target, true);
  // 考虑数组
  const cloneTarget: Record<string, any> = Array.isArray(target) ? [] : {};
  // 考虑原型一致
  Object.setPrototypeOf(cloneTarget, Object.getPrototypeOf(target));
  for (let key in target) {
    // 自有属性
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = cloneDeep(target[key], map);
    }
  }
  return cloneTarget;
};

const isObject = function (value: any) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

// 标签页通信（异步）
export function messageDeepClone(obj: AnyObject) {
  const { port1, port2 } = new MessageChannel();
  port1.postMessage(obj);
  return new Promise((resolve, reject) => {
    port2.onmessage = (msg) => {
      resolve(msg.data);
    };
  });
}

// JSON
export function jsonDeepClone(value: any) {
  return JSON.parse(JSON.stringify(value));
}
