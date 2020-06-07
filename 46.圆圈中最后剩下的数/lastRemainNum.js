/*
有个游戏是这样的:首先,让小朋友们围成一个大圈。
然后,他随机指定一个数m,让编号为0的小朋友开始报数。
每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,
从他的下一个小朋友开始,继续0...m-1报数....这样下去....直到剩下最后一个小朋友,可以不用表演,
并且拿到牛客名贵的“名侦探柯南”典藏版(名额有限哦!!^_^)。
请你试着想下,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)
    如果没有小朋友，请返回-1
*/ 

function LastRemaining_Solution1(n, m)
{
    if (n < 1) {
        return -1
    }
    let res = 0
    for (let i = 2;i < n + 1;i++) {
        res = (res + m) % i
    }
    return res
    // write code here
}
// 耗时过长
function LastRemaining_Solution2(n, m)
{
    if (n < 1) {
        return -1
    }
    let numbers = []
    for (let i = 0;i < n;i++) {
        numbers.push(i)
    }
    let start = 0,
        res = -1
    while (numbers.length > 0) {
        let k = (start + m - 1) % n
        res = numbers.splice(k,1)[0]
        n = n - 1
        start = k
    }
    return res
    // write code here
}


var n = 5,
    m = 4
console.log(LastRemaining_Solution1(n,m))
console.log(LastRemaining_Solution2(n,m))