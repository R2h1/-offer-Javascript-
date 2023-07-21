/**
 * js 实现函数重载(jquery里的实现)
 * 缺点：
 *   1. 需要创建一个对象 object 并传入
 *   2. fn.length 会排除掉参数默认值
 *   3. 只能适配参数的数量，对于参数类型无法适配
 * @param object
 * @param name
 * @param fn
 */
export function addMethod(object: AnyObject, name: string, fn: Function) {
  const old = object[name];
  object[name] = function (...args: any[]) {
    if (args.length === fn.length) {
      // 实参数量等于期望的形参数量，则运行当前fn
      return fn.apply(this, args);
    } else if (typeof old === 'function') {
      // 否则递归的运行之前保存的 object[name]
      return old.apply(this, args);
    }
  };
}

/**
 * js 实现函数重载优化版
 * @returns
 */
export function createOverload() {
  const callMap = new Map();
  /** 实际调用的重载函数 */
  function overload(this: any, ...args: any[]) {
    const key = args.map((arg) => typeof arg).join(','); // 实参类型
    const fn = callMap.get(key);
    if (fn) {
      return fn.apply(this, args);
    }
    throw new Error('no matching function');
  }
  /** 添加重载函数的工具函数 */
  overload.addImp = function (...args: any[]) {
    const fn = args.pop();
    if (typeof fn !== 'function') {
      return;
    }
    const types = args;
    callMap.set(types.join(','), fn);
  };
  return overload;
}
