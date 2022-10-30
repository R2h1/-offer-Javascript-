function solve(n, k, str1, str2) {
  // write code here
  let diffNum = 0;
  for (let i = 0; i < n; i++) {
    if (str1[i] !== str2[i]) {
      diffNum++;
    }
  }
  let interval = new Array(2);
  let sameNum = n - diffNum;
  console.log(diffNum, sameNum);
  if (diffNum >= k) {
    interval[0] = 0;
  } else {
    interval[0] = k - diffNum;
  }

  if (k === n) {
    interval[1] = sameNum;
  } else if (k === 0) {
    interval[1] = diffNum;
  } else if (sameNum < k) {
    interval[1] = k - sameNum + (n - sameNum) + diffNum;
  } else if (sameNum === k) {
    interval[1] = n;
  } else {
    interval[1] = n - k > k ? n - k : k;
  }
  return interval;
}

let n = 2,
  k = 1,
  str1 = 'AB',
  str2 = 'DD';
console.log(solve(n, k, str1, str2));
