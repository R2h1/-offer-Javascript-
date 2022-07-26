/** 
 * 递归计算第8个人的年龄
 * 其中第一个人10岁， 第二个比第一个大2岁，第三个比第二个大2岁，依次类推
*/

function getAge(n) {
    // write code here
    if (n < 1) throw new Error('n must bigger than 0');
    if (n === 1) return 10;
    return getAge(n - 1) + 2;
}

console.log(getAge(2))
