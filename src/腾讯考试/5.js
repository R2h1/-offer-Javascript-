const calDeleteCount = function (str, count) {
  let len = str.length;
  for (let i = 0; i < len - 1; i++) {
    if (str[i] == str[i + 1]) {
      let subStr = '';
      if (i + 2 < len) {
        subStr = str.slice(0, i) + str.slice(i + 2);
      } else {
        subStr = str.slice(0, i);
      }
      count++;
      count = calDeleteCount(subStr, count);
    }
  }
  return count;
};

var str = '4311234';

count = calDeleteCount(str, 0);
console.log(count);
