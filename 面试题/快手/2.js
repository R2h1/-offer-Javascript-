var a = [1, 2, 3, 4];
 
function set(a) {
  //a[0] = 0; 这样就改变了原始的a  这样就会输出[0, 2, 3, 4]
  a = [5, 6, 7, 8];   // a重新指向新数组对象[5, 6, 7, 8]， 和原来的a不同，是无法改变外层作用域的a的
}
 
set(a);
 
console.log(a)  // 输出 [1, 2, 3, 4] 因为共享传值