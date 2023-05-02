/**
 * getValue 函数用于获取某个对象的某个属性值，优化以下类型标注，使得函数的参数推导更合理。
 */
function getValue(obj: AnyObject, prop: string) {
  return obj[prop];
}
const cat = {
  name: 'kitty',
  age: 3,
  love: 'flower',
};
const user = {
  loginId: 'abc',
  loginPwd: '1008611',
};

// 答案：
export function getValueSolution<T extends object, K extends keyof T>(obj: T, prop: K): T[K] {
  return obj[prop];
}
