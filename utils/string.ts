/**
 * 重复一个字符串
 * @param str 
 * @param numberOfTimes 
 * @returns 
 */
const repeat = (str: string, numberOfTimes: number): string => Array(numberOfTimes + 1).join(str);
/**
 * 翻转字符串
 * @param str 
 * @returns 
 */
const reverse = (str: string): string => str.split('').reverse().join('');

/**
 * 利用 reduce 翻转字符串
 * @param str 
 * @returns 
 */
const reverseByReduce = (str: string): string => str.split('').reduce((rev, char) => `${char}${rev}`, '');

export {
  repeat,
  reverse,
  reverseByReduce
}