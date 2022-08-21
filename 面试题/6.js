// 洗牌算法

// 随机选择[min,max]之间的一个数
function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min)  // Math.random()生成[0, 1)的随机数
}
  
function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0,j,t; i < _arr.length; i++) {
      j = getRandomInt(0, i)  // 每次从0, i 中选择 一个数
      t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    return _arr
}
  
var arr = [1,2,3,4,5,6,7,8,9,10]
console.log(shuffle(arr))