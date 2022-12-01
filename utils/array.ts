// 数组置空 arr.length = 0

// 数组头部插入 newArr = [element].concat(arr);

// 数组尾部插入 newArr = arr.concat([element])

// 数组转换为对象 obj = { ...arr } 注意是浅转换

// 随机取数组值: value = arr[Math.floor(Math.random() * arr.length)]

// 遍历数组： Array.from 或 array.map

/**
 * 将值转化为数组
 * @param value
 * @returns
 */
const castArray = <T, _>(value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
};

/**
 * 检查数组是否为空
 * @param arr
 * @returns
 */
const isEmpty = <T, _>(arr: T[]): boolean => {
  if (Array.isArray(arr)) {
    return arr.length === 0;
  }
  return false;
};

/**
 * 浅拷贝数组
 * @param arr
 * @returns
 */
const clone = <T, _>(arr: T[]): T[] => [...arr];

/**
 * 比较两个数组(无序)
 * @returns
 */
const isEqualDisorder = <T, _>(a: T[], b: T[]): boolean => JSON.stringify(a.sort()) === JSON.stringify(b.sort());;

/**
 * 比较两个数组（有序）
 * @param a
 * @param b
 * @returns
 */
const isEqualOrderly = <T, _>(a: T[], b: T[]): boolean => a.length === b.length && a.every((v, i) => v === b[i]);

/**
 * 以指定key将对象数组转化为对象
 * @param arr
 * @param key
 * @returns
 */
const toObject = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> => (
  arr.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {})
);

/**
 * 字符串数组转为number数组
 * @param arr
 * @returns
 */
const toNumbers = (arr: string[]): number[] => arr.map(Number);

/**
 * 计算数组中某一个值的出现次数
 * @param arr
 * @param val
 * @returns
 */
const countOccurrences = (arr, val) => arr.filter(item => item === val).length;

/**
 * 创建指定范围的递增数字数组, 不包括max
 * @param min
 * @param max
 * @returns
 */
const range = (min, max) => [...Array(max - min).keys()].map(i => i + min);

/**
 * 创建笛卡尔积
 * @param arrays
 * @returns
 */
const cartesian = (...arrays) => arrays.reduce((acc, arr) => acc.flatMap(x => arr.map(y => [...x, y])), [[]]);

/**
 * 找到离n最近的数
 * @param arr
 * @param n
 * @returns
 */
const closest = (
  arr: number[],
  n: number
): number => arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n)
  ? curr
  : prev));

/**
 * 最后一个满足条件的index
 * @param arr
 * @param predicate
 * @returns
 */
const lastIndex = <T, _>(arr: T[],
  predicate: (a: T) => boolean): number => arr.reduce((prev, curr, index) => (predicate(curr) ? index : prev), -1);

/**
 * 查找数组中最大项的index
 * @param arr
 * @returns
 */
const indexOfMax = (arr: number[]): number => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);

/**
 * 查找数组中最小项的index
 * @param arr
 * @returns
 */
const indexOfMin = (arr: number[]): number => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0);

/**
 * 查找字符串数组中最长的字符串的长度
 * @param words
 * @returns
 */
const findLongest = (words: string[]): number => Math.max(...words.map(el => el.length));

/**
 * 数组中的最大,最小值
 * @param arr
 * @returns
 */
const max = (arr: number[]): number => Math.max(...arr);
const min = (arr: number[]): number => Math.min(...arr);

/**
 * 字母字符数组
 */
const alphabet: string[] = [...'abcdefghijklmnopqrstuvwxyz'];

/**
 * 获取所有连续元素构成的数组
 * @param arr
 * @param size
 * @returns
 */
const getConsecutiveArrays = <T, _>(arr: T[],
  size: number): T[][] => (size > arr.length ? [] : arr.slice(size - 1).map((_, i) => arr.slice(i, size + i)));

/**
 * 获取所有子数组
 * @param arr
 * @returns
 */
const getSubsets = <T,>(arr: T[]): T[][] => (
  arr.reduce((prev, curr) => prev.concat(prev.map(k => k.concat(curr))), [[]] as T[][])
);

/**
 * 获取数组中元素出现的所有索引
 * @param arr
 * @param value
 * @returns
 */
const indices = <T,>(arr: T[], value: T): number[] => (
  arr.reduce((acc, v, i) => (v === value ? [...acc, i] : acc), [] as number[])
);

/**
 * 求数组平均数
 * @param arr
 * @returns
 */
const average = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;

/**
 * 求数组的交集
 * @param a
 * @param arr
 * @returns
 */
const getIntersection = <T, _>(a: T[],
  ...arr: T[][]): T[] => [...new Set(a)].filter(v => arr.every(b => b.includes(v)));

/**
 * 获取数组中元素的排名
 * @param arr
 * @returns
 */
const ranking = (arr: number[]): number[] => arr.map((x, y, z) => z.filter(w => w > x).length + 1);

/**
 * 数组求和
 * @param arr
 * @returns
 */
const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

/**
 * 数组去重
 * @param arr
 * @returns
 */
const unique = arr => [...new Set(arr)];

/**
 * 求数组的并集
 * @param arr
 * @returns
 */
const union = <T, _>(...arr: T[][]): T[] => [...new Set(arr.flat())];

/**
 * 求数组的相对补集和绝对补集
 * @param a 
 * @param arr 
 * @returns 
 */
const complement = <T, _>(type: 'absolute' | 'relate', a: T[], ...arr: T[][]): T[] => {
  try {
    return [...new Set(a)].filter(v => {
      return arr.every(b => {
        /** 绝对补集(如果集合 b 中存在不是集合 a 中的元素，则直接返回空集 */
        if (type === 'absolute' && b.some(x => !a.includes(x))) {
          throw new TypeError(`${type} complementSet: b is not subset of a`);
        }
        return !b.includes(v);
      })
    });
  } catch (e) {
    return [];
  }
  
}

/**
 * 合并数组（不去重）
 * @param a
 * @param b
 * @returns
 */
const merge = <T, _>(
  a: T[],
  b: T[],
  needDeRepeat = false
): T[] => (needDeRepeat ? [...new Set(a.concat(b))] : a.concat(b));

/**
 * 按条件划分数组
 * @param arr
 * @param criteria
 * @returns
 */
const partition = <T, _>(arr: T[], criteria: (a: T) => boolean): T[][] => {
  return arr.reduce((acc, item) => {
    return (acc[criteria(item) ? 0 : 1].push(item), acc);
  }, [[] as T[], [] as T[]]);
}


/**
 * 排除或包括数组中满足条件的值
 * @param arr
 * @param condition
 * @param type
 * @returns
 */
const filterAdvanced = <T, _>(arr: T[], condition: (i: T) => Boolean, type: 'include' | 'exclude'): T[] => {
  const newCondition = type === 'include' ? condition : (i: T) => !condition(i);
  return arr.filter(newCondition);
};

/**
 * 复制数组n次
 * @param arr
 * @param n
 * @returns
 */
const repeat = <T, _>(arr: T[], n: number): T[] => [].concat(...Array(n).fill(arr));

/**
 * 数组随机化
 * @param arr
 * @returns
 */
const shuffle = <T, _>(arr: T[]): T[] => arr.sort(() => 0.5 - Math.random());

/**
 * 按key排序
 * @param arr
 * @param key
 * @returns
 */
const sortBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T[] => (
  arr.concat().sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return  -1;
    }
    return 0;
  })
);

/**
 * 数组排序
 * @param arr
 * @returns
 */
const sort = (arr: number[]): number[] => arr.sort((a, b) => a - b);

/**
 * 数组拆分成块
 * @param arr
 * @param size
 * @returns
 */
const chunk = <T,>(arr: T[], size: number): T[][] => (
  arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), [] as T[][])
);

/**
 * 矩阵转置
 * @param matrix
 * @returns
 */
const transpose = <T,>(matrix: T[][]): T[][] => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

/**
 * 交互 i 和 j的 值
 * @param a
 * @param i
 * @param j
 * @returns
 */
const swapItems = <T, _>(
  a: T[],
  i: number,
  j: number
): T[] => (a[i] && a[j] && [...a.slice(0, i), a[j], ...a.slice(i + 1, j), a[i], ...a.slice(j + 1)]) || a;

/**
 * 数组 unzip
 * @param arr
 * @returns
 */
const unzip = arr => arr.reduce(
  (acc, c) => (c.forEach((v, i) => acc[i].push(v)), acc),
  Array.from({ length: Math.max(...arr.map(a => a.length)) }, _ => [])
);

/**
 * 数组 zip
 * @param arr
 * @returns
 */
const zip = (...arr) => Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]));

export {
  castArray,
  isEmpty,
  clone,
  isEqualDisorder,
  isEqualOrderly,
  toObject,
  toNumbers,
  countOccurrences,
  range,
  cartesian,
  closest,
  indexOfMax,
  indexOfMin,
  findLongest,
  max,
  min,
  alphabet,
  getConsecutiveArrays,
  getSubsets,
  indices,
  average,
  getIntersection,
  ranking,
  sum,
  unique,
  union,
  merge,
  partition,
  filterAdvanced,
  repeat,
  shuffle,
  sortBy,
  sort,
  chunk,
  transpose,
  swapItems,
  zip,
  unzip,
  complement,
};


