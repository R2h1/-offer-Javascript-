function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
console.log(move({ x: 3, y: 8 })); // [3, 8]
console.log(move({ x: 3 })); // y没有定义， 解构为 undefined : [ 3, undefined ]
console.log(move({})); // x, y均没有定义, 均解构为 undefined : [ undefined, undefined ]
console.log(move()); // 都不传则使用默认参数 [ 0, 0 ]
