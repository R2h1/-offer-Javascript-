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
  filterAdvanced,
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


