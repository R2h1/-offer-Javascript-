function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}
 
console.log(move({x: 3, y: 8})) // [3, 8]
console.log(move({x: 3})) // y没有定义 : undefind
console.log(move({})) // x, y没有定义 : undefind
console.log(move()) // 不传使用默认参数