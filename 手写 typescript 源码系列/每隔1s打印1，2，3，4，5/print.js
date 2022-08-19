// let
function a1() {
    var arr = [1,2,3,4,5]
    for (let i of arr) {
        setTimeout(() => { console.log(i) }, 1000 * (i-1))
    }
}



// 闭包
function a2() {
    for (var i=1; i < 6; i++) {
        (function (i) {
          setTimeout(() => console.log(i), 1000*(i-1))
        })(i)
    }
    
}

//setTimeout第三个参数
function a3() {
    for (var i = 1; i < 6; i++) {
        setTimeout((i) => console.log(i), 1000*(i-1), i)
    }    
}


//Promise.all
function a4() {
    var arr = []
    for (let i = 1; i < 6;i++) {
        arr.push(print(i))
    }
    for (let i = 0; i < 5;i++) {
        arr[i].then((num) => console.log(num))
    }
    function print(num) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(num)
            }, (num - 1)  * 1000)
        })
    }
    // Promise.all(arr).then(() => console.log(5))
}

a3()
// a4()
