/*
给定一个数组A[0,1,...,n-1],
请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。
不能使用除法。（注意：规定B[0] = A[1] * A[2] * ... * A[n-1]，B[n-1] = A[0] * A[1] * ... * A[n-2];）
*/

// 暴力，超时
function multiply1(array) {
    if (!Array.isArray) {
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    if (!Array.isArray(array)) return null
    let len = array.length
    let arrayB = []
    for (let i = 0;i < len;i++) {
        let elm = 1
        for (let j = 0;j < i;j++) {
            elm *= array[j]
        }
        for (let j = i + 1;j < len;j++) {
            elm *= array[j]
        }
        arrayB.push(elm)
    }
    return arrayB
}

// O(n)
function multiply2(array)
{
    if (!Array.isArray) {
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    if (!Array.isArray(array)) return null
    let len = array.length,
        arrayB = []
    arrayB[0] = 1
    //计算 i 之前
    for (let i = 1; i < len;i++) {
        arrayB[i] = arrayB[i-1] * array[i-1]
    }
    //计算i 之后
    let tmp = 1
    for (let i = len - 2; i >= 0;i--) {
        tmp *= array[i + 1]
        arrayB[i] *= tmp
    }
    return arrayB
    
    // write code here
}

var array = [1,2,3,4,5]
console.log(multiply1(array))
console.log(multiply2(array))