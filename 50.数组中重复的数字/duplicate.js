/*
在一个长度为n的数组里的所有数字都在0到n-1的范围内。 
数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 
例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。
*/

function duplicate1(numbers, duplication)
{
    if (!Array.isArray) {
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    if (!Array.isArray(numbers) || numbers.length < 2) return false
    let len = numbers.length
    for (let i = 0;i < len;i++) {
        if (numbers.indexOf(numbers[i]) !== numbers.lastIndexOf(numbers[i])) {
            duplication[0] = numbers[i]
            return true
        }
    }
    return false
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
}

function duplicate2(numbers, duplication)
{
    if (!Array.isArray) {
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    if (!Array.isArray(numbers) || numbers.length < 2) return false
    let helpMap = new Map();
    for(let i = 0;i < numbers.length;i++){
        if(helpMap.get(numbers[i])){
            duplication[0] = numbers[i]
            return true
        }
        else{
            helpMap.set(numbers[i], 1)
        }
    }
    return false
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False 
}
function duplicate3(numbers, duplication)
{
    // write code here
    // 这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    // 函数返回True/False
    if (!Array.isArray) {
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    if (!Array.isArray(numbers) || numbers.length < 2) return false
    let len = numbers.length
    for (let i = 0; i < len; i++) {
        if (numbers[i] < 0 || numbers[i] > len - 1) return false;
    }
    for (let i = 0; i < len; i++) {
        while (numbers[i] != i) {
            if (numbers[i] === numbers[numbers[i]]) {
                duplication[0] = numbers[i]
                return true
            } else {
                let temp = numbers[i]
                numbers[i] = numbers[temp]
                numbers[temp] = temp
            }
        }
    }
    return false;
}

var numbers = [0,2,2,3,4,5,6]
    duplication = []
console.log(duplicate1(numbers,duplication))
console.log(duplicate2(numbers,duplication))
console.log(duplicate3(numbers,duplication))