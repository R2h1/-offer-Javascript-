function replaceElements( arr ) {
    // write code here
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (i  === len - 1) {
            arr[i] = -1
        } else {
            arr[i] =  Math.max(...arr.slice(i+1))
        }
    }
    return arr
}

let arr  = [17, 18, 5, 4, 6, 1]

console.log(replaceElements(arr))