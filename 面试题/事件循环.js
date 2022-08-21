//判断输出
console.log(0);  // 第一个宏任务 第1

setTimeout(() => {
    console.log(1); // 第二个宏任务   第5
});

var data = {};
for (var i = 0; i < 10; i++) {
    data[i] = function () {
        console.log(i); 
    }
}

var p = new Promise((res, rej) => {
    console.log(2);  // 立即执行 宏任务 第2
    res(3); // 微任务  // 第4
});

p.then(data => {
    console.log(data);
});

console.log(data[8]());  //第一个宏任务 输出10 ， i 已经变成 10  第3 
// 第一个宏任务
// 0
// 2
// 10
// 第一个微任务
// 3
// 1
