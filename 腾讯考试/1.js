var arr1 = readline().split(',')
var arr2 = readline().split(',')
const mergeArray = (arr1, arr2) => {
    return arr1.concat(arr2).sort((a, b) => a - b)
}
var res = mergeArray(arr1, arr2)
print(res)