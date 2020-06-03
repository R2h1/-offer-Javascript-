/*
求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
*/ 

function Sum_Solution(n)
{
    let sum = n
    // sum == 0 短路不会计算 sum += Sum_Solution(n - 1)
    // 递归终止
    sum && (sum += Sum_Solution(n - 1))
    return sum
    // write code here
}

var n = 10

console.log(Sum_Solution(n))