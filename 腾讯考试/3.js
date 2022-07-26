var arr = [1, 2, 3, 4, 5, 6, 7, 8]
var n = arr.length
let mid = (n - 1) / 2

for (let i = 0; i < n; i++) {
    if (i < mid) {
        console.log(arr[Math.floor(mid + 1)])
    } else {
        console.log(arr[Math.floor(mid)])
    }
}