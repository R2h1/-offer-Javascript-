declare type AnyObject = {
  [propName: string]: any;
};

// 可以是任何类型，但不能是 K
// 比如 ExceptType<T, Date> 即可以是任何类型，但不能是 Date
declare type ExceptType<T, K> = T extends K ? never : T;

declare type Constructor<T> = new (...args: any[]) => T;
