/** 请完善以下类型，使得更加合理
type Watcher = {
  on(
    eventName: string,
    callback: (oldValue: any, newValue: any) => void
  ): void;
}

declare function watch(obj: object): Watcher;

const personWatcher = watch({
  firstName: 'Saoirse',
  lastName: "Ronan",
  age: 26,
  sex: '男',
  level: 2,
});

personWatcher.on(
  'ageChanged',
  (oldValue, newValue) => {
    console.log(oldValue, newValue);
});
 */

type Watcher<T> = {
  on<K extends string & keyof T>(eventName: `${K}Changed`, callback: (oldValue: T[K], newValue: T[K]) => void): void;
};

declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26,
  sex: '男',
  level: 2
});

personWatcher.on('ageChanged', (oldValue, newValue) => {
  console.log(oldValue, newValue);
});

/**
  // 给函数进行类型标注
  // 最后一个参数是函数，前面是不定参数
  // 不定参数的个数等于最后一个函数的参数个数
  // 不定参数的值对应于最后一个函数的参数类型
  addImpl('number', 'boolean', 'number', (a, b, c) => {})
 */
type JSTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
  function: Function;
  symbol: symbol;
  undefined: undefined;
  bigint: bigint;
};
type JSTypeName = keyof JSTypeMap;
type ArgsType<T extends JSTypeName[]> = {
  // [I in keyof T]、T[I]对于数组来说分别就是下标和值
  [I in keyof T]: JSTypeMap[T[I]];
};
declare function addImpl<T extends JSTypeName[]>(...args: [...T, (...args: ArgsType<T>) => any]): void;
