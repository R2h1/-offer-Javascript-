/**
 * 判断值是否可迭代
 * @param val 一个 JavaScript 值
 * @returns 
 */
export function isIterable(val: any) {
	return (typeof Symbol !== 'undefined' && Symbol && 'iterator' in Symbol
		&& val != null && typeof val[Symbol.iterator] === 'function');
};

/**
 * 空函数
 */
export const noop = () => {};

export const isObject = (val: unknown): val is Record<any, any> =>val !== null && typeof val === 'object'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isPromise = <T = any>(val: unknown): val is Promise<T> => isObject(val) && isFunction(val.then) && isFunction(val.catch)