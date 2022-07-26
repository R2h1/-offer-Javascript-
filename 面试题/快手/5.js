var arr1 = [1, 2, 5, 7, 9];
var arr2 = [3, 6, 8, 10, 4,];
//有序合并数组

function mergeArr(arr1, arr2) {
    // 合并有序数组
    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)
    let len1 = arr1.length,
        len2 = arr2.length;
    let res = []
    let i = 0,
        j = 0;
    while (i < len1 && j < len2) {
        if (arr1[i] < arr2[j]) res.push(arr1[i++])
        else res.push(arr2[j++])
    }
    if (i === len1) res.push(...arr2.slice(j - 1))
    else res.push(...arr1.slice(i - 1))
    console.log(res)
    return res
}
mergeArr(arr1, arr2)