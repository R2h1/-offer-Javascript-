/**
 * 获取一个值的构造函数的名称
 * @param {any} value
 * @example
 *   getConstructorName(1); // 'Number';
 *   getConstructorName('1'); // 'String';
 *   getConstructorName(true); // 'Boolean';
 *   getConstructorName([]); // 'Array';
 *   getConstructorName({}); // 'Object';
 *
 *   function Student() {};
 *   getConstructorName(new Student()); // 'Student';
 */
export function getConstructorName(value: any): string {
  return Object.getPrototypeOf(value).constructor.name;
}
