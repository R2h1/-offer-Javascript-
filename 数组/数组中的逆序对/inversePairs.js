/*
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。
输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P%1000000007
输入描述:
题目保证输入的数组中没有的相同的数字

数据范围：

	对于%50的数据,size<=10^4

	对于%75的数据,size<=10^5

	对于%100的数据,size<=2*10^5

示例1
    输入
    1,2,3,4,5,6,7,0
    输出
    7
*/
function InversePairs(data)
{
    // write code here
    let len = data.length;
    let count = 0;
    count = merge(data, 0, len - 1)
    return count 
    // write code here
}
function merge(data,left,right) {
    if (right === left) {
        return 0
    } else if (right === left + 1) {
        if (data[right] <= data[left]) {
            [data[left],data[right]] = [data[right],data[left]]
            return 1
        }
        return 0
    }
    let mid = Math.ceil((right + left) / 2)
    let count = merge(data, left, mid) + merge(data, mid + 1, right)
    let tmp = [],
        i = left,
        j = mid + 1
    for (;i <= mid && j <= right;) {
        if (data[i] <= data[j]) {
            tmp.push(data[i])
            i++
        } else {
            tmp.push(data[j])
            j++
            count += mid - i + 1
        }
    }
    while (j <= right) {
        tmp.push(data[j])
        j++
    }
    while(i <= mid ){
        tmp.push(data[i]);
        i++;
    }
    for(let i = left,j = 0;i <= right;i++,j++){
        data[i] = tmp[j]
    }
    return count;
}

var data=[1,2,3,4,128,342,546,4543,33,56,22,34,57,12,79,333,98,48,23,21,6,7,0]
console.log(InversePairs(data))