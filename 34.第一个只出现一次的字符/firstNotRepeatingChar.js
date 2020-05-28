/*
在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,
并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）
*/

function FirstNotRepeatingChar(str)
{
    //对象
    let letterCount = {}
    for (let i = 0,len = str.length;i < len;i++) {
        if (letterCount[str[i]]) {
            letterCount[str[i]] += 1
        } else {
            letterCount[str[i]] = 1
        }
    }
    
    /*map方法
    let letterCount = new Map();
    for(let i = 0,len = str.length;i < len;i++){
        if(letterCount.has(str[i])){
            letterCount.set(str[i], letterCount.get(str[i])+1)
        } else {
            letterCount.set(str[i], 1)
        }
    }*/
    for (let i = 0,len = str.length;i < len;i++) {
        if (letterCount[str[i]] === 1) {
            return [i,str[i]]
        }
    }
    return -1
    // write code here
}

var str = 'advdvfdgweewbfgdswqwadfdsvdsfaewqfsdvcxvsdfsdbfdfsafweq'
console.log(FirstNotRepeatingChar(str))