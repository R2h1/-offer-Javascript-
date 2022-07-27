/*
数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。
由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
*/
function MoreThanHalfNum_Solution2(numbers)
{

    numbers.sort()
    let res = numbers[0],
        count = 1
    for (let i = 1;i < numbers.length;i++) {
        if (numbers[i] === res){
            count++
        } else {
            count = 1
            res = numbers[i]
        }
        if (count > numbers.length / 2) {
            break
        }
    }
    return count > numbers.length / 2 ? res : 0
    // write code here
}


function MoreThanHalfNum_Solution(numbers){
    let obj = {}
    for(let i = 0; i < numbers.length; i++) {
        if(!obj[numbers[i]]) {
            obj[numbers[i]] = 1
        } else {
            obj[numbers[i]]++
        }
        if (obj[numbers[i]] > numbers.length / 2) {
            return numbers[i]
        }
    }
    return 0
}

function MoreThanHalfNum_Solution3(numbers)
{
    let len = numbers.length
    if (len === 0) return 0
    let res = numbers[0]
    let count = 0
    //留下出现次数最多的
    for (let num of numbers) {
        if(count === 0){
            res = num;
            count = 1;
        } else {
            if(res === num)  
                count++;
            else 
                count--;
        }
    }
    count = 0
    for (let num of numbers) {
        if (num === res) count++
    }
    return count > len / 2 ? res: 0
    // write code here
}
var numbers = [1,2,3,5,4,2]
console.log(MoreThanHalfNum_Solution(numbers))
console.log(MoreThanHalfNum_Solution2(numbers))
console.log(MoreThanHalfNum_Solution3(numbers))