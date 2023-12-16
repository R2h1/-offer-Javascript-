/*属性描述符：
对象里目前的属性描述符有两种：
    数据描述符：具有值的属性
    存取描述符：由getter与setter函数对描述的属性
描述符功能：
    数据描述符与存取描述符皆可修改:
        configurable：当前对象元素的属性描述符是否可改，是否可删除
        enumerable：当前对象元素是否可枚举
    唯有数据描述符可以修改：
        value: 当前对象元素的值
        writable：当前对象元素的值是否可修改
    唯有存取描述符可以修改：
        get：读取元素属性值时的操作
        set：修改元素属性值时的操作
由于ES5环境没有block的概念，所以是无法百分百实现const，
只能是挂载到某个对象下，要么是全局的window，要么就是自定义一个object来当容器

Object.defineProperty(obj, prop, desc)

*/

var __const = function (variable, value) {
  global[variable] = value; // 把要定义的 data 挂载到 window 下，并赋值 value
  Object.defineProperty(global, variable, {
    // 利用 Object.defineProperty 的能力劫持当前对象，并修改其属性描述符
    enumerable: false,
    configurable: false,
    get: function () {
      return value;
    },
    set: function (value) {
      throw new TypeError('Assignment to constant variable.');
    }
  });
};
__const('a', 10);
console.log(a);
delete global.a;
console.log(a);
for (let item in global) {
  // 因为 const 定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
  if (item === 'a') {
    // 因为不可枚举，所以不执行
    console.log(global[item]);
  }
}
a = 10; // 报错
