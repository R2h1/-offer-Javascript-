/**
 * 判断一个值是不是奇数
 * @param value
 * @returns
 */
export function isOdd(value: number): boolean {
  if (!isNumber(value)) {
    throw new TypeError('expected a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('expected an integer');
  }
  if (!Number.isSafeInteger(value)) {
    throw new Error('value exceeds maximum safe integer');
  }
  const n = Math.abs(value);
  return n % 2 === 1;
}

export function isEven(num: number) {
  return !isOdd(num);
}

export function isNumber(num: number | string) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
}
