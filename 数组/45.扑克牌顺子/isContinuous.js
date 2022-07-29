/*
LL今天心情特别好,因为他去买了一副扑克牌,发现里面居然有2个大王,2个小王(一副牌原本是54张^_^)
...他随机从中抽出了5张牌,想测测自己的手气,看看能不能抽到顺子,如果抽到的话,他决定去买体育彩票,嘿嘿！！
“红心A,黑桃3,小王,大王,方片5”,“Oh My God!”不是顺子.....LL不高兴了,
他想了想,决定大\小 王可以看成任何数字,并且A看作1,J为11,Q为12,K为13。
上面的5张牌就可以变成“1,2,3,4,5”(大小王分别看作2和4),“So Lucky!”。LL决定去买体育彩票啦。 
现在,要求你使用这幅牌模拟上面的过程,然后告诉我们LL的运气如何， 
如果牌能组成顺子就输出true，否则就输出false。为了方便起见,你可以认为大小王是0。
*/

function IsContinuous1(numbers)
{
    let len = numbers.length
    if (len !== 5) return false
    let count = 0
    for(let i = 0; i < len; i++){
        if(numbers[i] === 0){
            count++
        } else if (numbers[i] < 0 || numbers[i] > 13) {
            return false
        }
    }
    numbers.sort((a,b) => a-b)
    numbers.splice(0,count)
    for (let i = 0;i < numbers.length - 1;i++) {
        if (numbers[i + 1] === numbers[i]) {
            return false
        } else if (numbers[i+1] - numbers[i] > 1) {
            count -= (numbers[i + 1] - numbers[i] - 1)
        }
    }
    return count >= 0
    // write code here
}
// 必须满足的两个条件：
// 1. 除0外没有重复的数
// 2. max - min < 5
function IsContinuous2(numbers)
{
    let len = numbers.length
    if (len !== 5) return false
    let count = 0
    numbers.sort((a,b) => a-b)
    for(let i = 0; i < len; i++){
        if(numbers[i] === 0){
            count++
        } else if (numbers[i] < 0 || numbers[i] > 13 || numbers[i + 1] === numbers[i]) {
            return false
        }
    }
    
    numbers.splice(0,count)
    return numbers[numbers.length - 1] - numbers[0] < 5
    // write code here
}

var numbers1 = [1,1,0,0,0],
    numbers2 = [1,1,0,0,0]

console.log(IsContinuous1(numbers1))
console.log(IsContinuous2(numbers2))
