// 箭头函数 this 指向外层封闭作用域（非箭头函数）
const name = '123';
const obj = {
    name: '456',
    getName1: function () {
        console.log(this.name); //  this.name = obj.name 456
        function printName() {
            console.log(this.name); // this.name = window.name 123
        }
        printName();
    },
    getName2: () => {
        console.log(this.name); // this.name = window.name 123
        const printName = () => {
            console.log(this.name); // this.name = window.name 123
        }
        printName();
    },
    getName3: function () {
        console.log(this.name); //  this.name = obj.name 456
        const printName = () => {
            console.log(this.name); // this.name = obj.name 456
        }
        printName();
    },
    getName4: () => {
        console.log(this.name); //  this.name = window.name 123
        function printName() {
            console.log(this.name); // this.name = window.name 123
        }
        printName();
    },
}
obj.getName1();
obj.getName2();
obj.getName3();
obj.getName4();