/**
 * bind和call,apply不同在于不会立即执行，
 * @param {*} thisArg
 * @param  {...any} args
 */

Function.prototype.myBind = function (thisArg, ...args) {
  if (typeof this !== 'function') {
    throw new Error('The binding is not a function');
  }
  // 调用函数
  const that = this;
  const fbound = function (...innerArgs) {
    // 让new有更高的优先级
    that.apply(this instanceof that ? this : thisArg, args.concat(innerArgs));
  };
  // 返回的函数需继承原函数原型链上的属性和方法
  fbound.prototype = Object.create(that.prototype);
  return fbound;
};

// const test = function (...args) {
//   console.log('调用者:', this);
//   console.log(arguments, ...args);
// };

// test.myBind({ name: 'rrh_th' }, 2, 3)(4, 5, 6);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return this.x + ',' + this.y;
};

var YAxisPoint = Point.myBind(null, 0);

var axisPoint = new YAxisPoint(5);
console.log(axisPoint.toString());

console.log(axisPoint instanceof Point);
console.log(axisPoint instanceof YAxisPoint);

console.log(axisPoint.__proto__, axisPoint, Point);
