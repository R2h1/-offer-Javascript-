/**
 * 判定传入的函数是否标记了 async
 * @param fn
 * @returns {boolean}
 */
export function isAsyncFunction(fn: any) {
  // fn[Symbol.toStringTag] === 'AsyncFunction';
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
}
