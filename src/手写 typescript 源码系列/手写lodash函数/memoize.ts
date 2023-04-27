/**
 * 创建一个函数来记忆 func 的结果。如果提供了解析器 resolver，它会根据提供给记忆函数的参数确定用于存储结果的缓存键。
 * 默认情况下，提供给记忆函数的第一个参数用作 map 缓存键。使用记忆函数的 this 绑定调用 func。
 * 注意：缓存作为缓存函数的缓存属性 Cache 公开。它的创建可以通过将 memoize.Cache 构造函数替换为一个实现了 Map 方法接口 clear、delete、get、has 和 set 的构造函数来定制。
 * @param func
 * @param resolver
 * @example
 *   const object = { 'a': 1, 'b': 2 };
 *   const other = { 'c': 3, 'd': 4 };
 *   const values = memoize((obj) => Object.values(obj));
 *   values(object); // [1, 2]
 *   values(other); // [3, 4]
 *
 *   object.a = 2;
 *   values(object); // [1, 2]
 *   // Modify the result cache.
 *   values.cache.set(object, ['a', 'b']);
 *   values(object); // ['a', 'b']
 *
 *   // Replace `memoize.Cache`.
 *   memoize.Cache = WeakMap;
 */
memoize.Cache = WeakMap;
export function memoize(func: Function, resolver?: Function) {
  const memoized = function (this: any, ...args: any[]) {
    const key = typeof resolver === 'function' ? resolver.apply(this, args) : args[0];
    if (memoized.cache.has(key)) {
      return memoized.cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache.set(key, result);
    return result;
  };
  memoized.cache = new memoize.Cache();
  return memoized;
}
