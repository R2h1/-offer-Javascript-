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

export {
  castArray,
  isEmpty,
  clone,
  filterAdvanced,
  complement,
};


