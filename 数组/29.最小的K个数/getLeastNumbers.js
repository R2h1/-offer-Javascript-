/*
输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。
*/

function findMaxIndex(arr) {
    let max = arr[0],
        index = 0;
    for(let i=1,len=arr.length; i<len; ++i) {
        if(max < arr[i]) {
            max = arr[i];
            index = i;
        }
    }
    return index;
}
function GetLeastNumbers_Solution(input, k)
{
    let len = input.length;
    if(k > len) {
        return [];
    }
    let arr = input.slice(0, k),
        maxIndex = findMaxIndex(arr),
        max = arr[maxIndex];
    for(let i = k; i<len; ++i) {
        if(input[i] < max) {
            arr[maxIndex] = input[i];
            maxIndex = findMaxIndex(arr);
            max = arr[maxIndex];
        }
    }
    return arr.sort((a,b) => a-b);
    // write code here
}
var input = [1,2,7,4,5,6,9,10],
    k = 4
console.log(GetLeastNumbers_Solution(input,k))