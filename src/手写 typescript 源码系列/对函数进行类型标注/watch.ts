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
