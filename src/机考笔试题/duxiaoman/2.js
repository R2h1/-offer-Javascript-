let n = readInt();
const isSimiliaryRoundStr = (str) => {
  let strLen = str.length;
  if (strLen < 6 || strLen % 3 !== 0) {
    return 'No';
  }
  let sameArr = [];
  for (let i = 0; i < 3; i++) {
    if (str[i] === str[i + 3]) {
      sameArr.push(i);
    }
  }
  let sameNum = sameArr.length;
  if (sameNum < 2) {
    return 'No';
  }
  for (let i = 6; i < strLen; i = i + 3) {
    let icount = sameNum;
    for (let item of sameArr) {
      if (str[item + i] !== str[item]) {
        icount--;
      }
    }
    if (icount < 2) {
      return 'No';
    }
  }
  return 'Yes';
};
while (n > 0) {
  let str = read_line();
  let res = isSimiliaryRoundStr(str);
  print(res);
  n--;
}
