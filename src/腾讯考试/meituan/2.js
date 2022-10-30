var n = 12,
  m = 2,
  k = 5;
var beautifulValues = [5, 1, 5, 5, 4, 5, 5, 5, 5, 6, 7, 2];

function getWayNum(arr, n, m, k) {
  // 购买物品不低于k
  let count = 0,
    start = 0;
  while (start + m <= n) {
    let tmpArr = arr.slice(start, start + m);
    if (isAdd(tmpArr)) {
      count++;
      start++;
    } else {
      start += m;
    }
  }
  return count;
}

function isAdd(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i] < k) {
      return false;
    }
  }
  return true;
}

console.log(getWayNum(beautifulValues, n, m, k));
