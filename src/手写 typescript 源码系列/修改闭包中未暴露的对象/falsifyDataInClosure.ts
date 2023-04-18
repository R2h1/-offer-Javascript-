const o = (function () {
  const obj: AnyObject = {
    a: 1,
    b: 2,
  };
  // 解决办法1：防止外部访问原型，设置obj的原型为 null
  // Object.setPrototypeOf(obj, null);
  return {
    get: function (k: string) {
      // 解决办法2：防止外部访问原型
      // if (obj.hasOwnProperty(k)) {
      //   return obj[k];
      // }
      // return undefined;
      return obj[k];
    },
  };
})();

// 如何在不改变上述代码的情况下修改 obj 对象
// 1. 首先需要获取到 内部的 obj 对象，通过在 obj 原型上定义一个返回 自身的 getter 即可
// 2. obj.get方法在自身找不到时就会去访问原型上的 _obj 属性
Object.defineProperty(Object.prototype, '_obj', {
  get() {
    return this;
  },
});
const obj = o.get('_obj');
