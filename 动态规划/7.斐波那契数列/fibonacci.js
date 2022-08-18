/*
大家都知道斐波那契数列，现在要求输入一个整数n，
请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。n <= 39
*/

function Fibonacci(n) {
    if (n < 0) {
        throw new Error('the input number is invalid');
    } 
    if (n < 2) {
        return n;
    }
    let a = 0,
        b = 1,
        fn;
    for (let i = 1; i < n; i++) {
        fn = a + b
        a = b
        b = fn
    }
    return fn
    // write code here
}

var n = 10
console.log(Fibonacci(n))

