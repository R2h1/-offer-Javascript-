// 导出的变量应该使用 const 
export const counter = 1;
export function increase() {
  // 内部也不要修改导出的变量
  // counter = counter + 1;
}