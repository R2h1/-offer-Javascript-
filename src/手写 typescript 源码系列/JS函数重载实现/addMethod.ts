/**
 * js 实现函数重载
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
