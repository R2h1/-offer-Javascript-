// 阿里面试题
let a = { n: 1 };
let b = a; // b: { n: 1 }; a: { n: 1 }
a.x = a = { n: 2 };
// 成员访问运算符 a.x 优先级最高，因此是将表达式 a = { n: 2 } 的结果赋值给 { n: 1 } 的 x 属性。
// 然后赋值运算符优先级从右向左，将 a 赋值为 { n: 2 };
// a: { n: 2 }; b: { n: 1, x: { n： 2 }};

console.log(a.x); // undefined;
console.log(b.x); // { n: 2 };
