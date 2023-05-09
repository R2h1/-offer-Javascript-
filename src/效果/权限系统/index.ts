// 可新增
const CREATE = 0b0001;
// 可删除
const DELETE = 0b0010;
// 可修改
const UPDATE = 0b0100;
// 可浏览详情   0b1111
const DETAIL = 0b1000;

// 使用或运算表达组合权限
const permission = DETAIL | CREATE | DELETE | UPDATE;

/**
 * 使用与运算判定权限
 * @param value 组合后权限值
 * @param key 单一权限值对应的变量
 * @returns
 */
export function hasPermission(value: number, key: number) {
  return (value & key) === key;
}

/**
 * 使用异或运算删除某一权限
 * @param value 组合后权限值
 * @param key 单一权限值对应的变量
 * @returns
 */
export function deletePermission(value: number, key: number) {
  return (value | key) ^ key;
}
