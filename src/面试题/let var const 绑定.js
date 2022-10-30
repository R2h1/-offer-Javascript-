let x = 1;
const y = 2;
var z = 3;
console.log(window.x); // let 不绑定到window, window.x = undefined
console.log(window.y); // const 不绑定到window, window.y = undefined
console.log(window.z); // var 绑定到window, window.z = 3
