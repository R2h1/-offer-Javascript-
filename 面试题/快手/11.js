Function.prototype.a = () => alert(1);
Object.prototype.b = () => alert(2);
function A() {};
var a = new A();
a.a(); // 报错 // a是A的实例对象，因此查找原型链到Object.prototype，
a.b(); // 2  // a是A的实例对象，因此查找原型链到Object.prototype，
A.a() // 1 A 是Function的实例，因此查找原型链到Function.prototype