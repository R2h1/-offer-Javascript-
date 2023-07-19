// 获取函数的返回值类型
// T extends (...args: any[]) => any 限制传入类型是函数
// infer R 表示待推断的函数返回值类型保存为 R
// 因此：如果 T 是 函数，则
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

// 获取 Promise 的值类型
// infer R 表示待推断的Promise 的值类型保存为 R
type PromiseType<T> = T extends Promise<infer R> ? PromiseType<R> : T;

// 获取函数的首个参数的类型
type FirstArgType<T> = T extends (first: infer R, ...args: any[]) => any ? R : T;

// 获取数组项的类型
// 如果数组中存在多个类型，则得到所有类型的联合类型
type ArrayEveryType<T> = T extends (infer R)[] ? R : T;

// 柯里化所返回的函数的类型
// 1. 传入的是无参函数，所返回的函数的类型为 () => K；
// 2. 传入的是单参函数，所返回的函数的类型为 (x) => K；
// 3. 传入的是多参函数，所返回的函数的类型为 (x) => 新的函数；
type Curried<T, K> = T extends []
  ? () => K
  : T extends [infer R]
  ? (param: R) => K
  : T extends [infer R, ...infer P]
  ? (param: R) => Curried<P, R>
  : never;
// 柯里化函数类型
type Curry = <T extends any[], K>(fn: (...args: T) => K) => Curried<T, K>;
