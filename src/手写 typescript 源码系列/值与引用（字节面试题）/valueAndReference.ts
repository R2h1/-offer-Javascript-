const foo = { bar: 1 };
const arr1 = [1, 2, foo];
const arr2 = arr1.slice(1);
/**
 * 初始：
 *   foo: { bar: 1 },
 *   arr1: [1, 2, foo],
 *   arr2: [2, foo],
 */
//@ts-ignore
arr2[0]++; //  foo: { bar: 1 }, arr1: [1, 2, foo], arr2: [3, foo],
//@ts-ignore
arr2[1].bar++; // foo: { bar: 2 }, arr1: [1, 2, foo], arr2: [3, foo],
foo.bar++; // foo: { bar: 3 }, arr1: [1, 2, foo], arr2: [3, foo],
//@ts-ignore
arr1[2].bar++; // foo: { bar: 4 }, arr1: [1, 2, foo], arr2: [3, foo],
/**
 * 最后：
 *   foo: { bar: 4 },
 *   arr1: [1, 2, foo],
 *   arr2: [3, foo],
 */
console.log(arr1[1] === arr2[0]); // false
console.log(arr1[2] === arr2[1]); // true
console.log(foo.bar); // 4

export default {};
