/**
 * 实现 create
 * @param p
 * @returns
 */
export function myCreate(p: any) {
  if (typeof p !== 'object') {
    throw new TypeError('proto must be a object or null');
  }
  const F = <any>function () {};
  F.prototype = p;
  return new F();
}
