/*
统计一个数字k在排序数组data中出现的次数
*/

function GetNumberOfK(data, k)
{
    let helpMap = new Map()
    for (let i = 0,len = data.length;i < len;i++) {
        if (helpMap.has(data[i])) {
            helpMap.set(data[i],helpMap.get(data[i]) + 1)
        } else {
            helpMap.set(data[i],1)
        }
    }
    return helpMap.has(k) ? helpMap.get(k) : 0
    // write code here
}

function GetNumberOfK2(data, k)
{
    let str = data.join('#') + '#'
    let reg = new RegExp(k+'#', 'g')
    let res = str.match(reg)
    return res ? res.length : 0
    // write code here
}


function GetNumberOfK3(data, k)
{
    // write code here
    let count = 0;
    if (data.indexOf(k) >= 0) {
        let index = data.indexOf(k)
        count++
        let length = data.length
        for(let i = index + 1; i < length; i++){
            if(data[i] == k) count++
            else break
        }  
    } 
    return count
}
function GetNumberOfK4(data, k)
{
    // write code here
    let start = data.indexOf(k)
    if (start === -1) return 0
    let end = data.lastIndexOf(k)
    return end - start + 1
}

function GetNumberOfK5(data, k)
{
    // write code here
    if(data.length==0){
        return 0;
    }
    let index = 0,
        low = 0,
        high = data.length-1,
        middle = 0
    //二分查找找到k的index
    while (low <= high) {
        middle = (high+low) >> 1
        if (data[middle] === k) {
            index = middle;
            break;
        } else if (data[middle] > k) {
            high = middle - 1
        } else {
            low = middle + 1
        }
        index = -1
    }
    if (index === -1) {
        return 0
    }
    //找到了 分别往左右查找边界
    let start = index,
        end = index,
        count = 0
    while (data[start] === k) {
        count++
        start--
    }
    while (data[end] === k) {
        count++
        end++
    }
    return count - 1
}
var data = [1,2,3,4,4,5,6,6,6,9,10],
    k = 6
console.log(GetNumberOfK(data, k))
console.log(GetNumberOfK2(data, k))
console.log(GetNumberOfK3(data, k))
console.log(GetNumberOfK4(data, k))
console.log(GetNumberOfK5(data, k))
console.assert(1,"输出")