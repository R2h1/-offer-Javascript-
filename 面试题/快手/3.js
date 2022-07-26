var name = '123';
 
var obj = {
    name: '456',
    getName: function () {
        function printName() {
            console.log(this.name);
        }
 
        printName();
    }
}
 
obj.getName();  // 输出 123 因为调用printName函数的是window 它的name是123

// 如何输出456
// 1. 箭头函数

/*
var name = '123';
 
var obj = {
    name: '456',
    getName: function () {   // 如果getName也是箭头函数，而箭头函数不绑定this，所以不是当前对象，
                                而是外层封闭作用域即window
        console.log(this.name);
        printName = () => {
            console.log(this.name);   // 箭头函数this 指向外层封闭作用域（非箭头函数）
        }
        printName();
    }
}
obj.getName();

var obj = {
    name: '456',
    getName: () => {   
        console.log(this.name);  // 123  箭头函数的this 是外层即该对象的外层window
        printName = () => {
            console.log(this.name);   // 123
        }
        printName();
    }
}
obj.getName();

*/
// 2. call

/*

var name = '123';
 
var obj = {
    name: '456',
    getName: function () {
        function printName() {
            console.log(this.name);
        }
 
        printName.call(obj);
    }
}
 
obj.getName();
*/


