/**
 * 实现一个 new
 * @param constructor
 * @param args
 * @returns
 */
export function myNew(constructor: Function, ...args: any[]) {
  // 判断构造函数是否为函数
  if (typeof constructor !== 'function') {
    throw new TypeError('constructor must be a function');
  }
  // 创建一个新对象，以构造函数的原型对象作为新对象的原型
  const instance = Object.create(constructor.prototype);
  // 构造函数执行的返回结果
  const res = constructor.apply(instance, args);
  // 如果是对象则返回构造函数执行的返回结果，否则返回上面创建的 instance 实例
  return res !== null && typeof res === 'object' ? res : instance;
}
