let T = parseInt(readline());

for (let i = 0; i < T; i++) {
  // 第 i 组输入数据
  let line1 = readline().split(' '),
    n = parseInt(line1[0]),
    m = parseInt(line1[1]);
  let line2 = readline().split(' '),
    x = parseInt(line2[0]),
    y = parseInt(line2[1]);
  let line3 = readline().split(' ');
  let a = parseInt(line3[0]),
    b = parseInt(line3[1]),
    c = parseInt(line3[2]),
    d = parseInt(line3[3]);
  let mapOfNM = [];
  for (let j = 0; j < n; j++) {
    mapOfNM.push(readline().split(''));
  }
  //求解
  let res = getFastTime(mapOfNM, n, m, x, y, a, b, c, d);
  print(res);
}

const getFastTime = (mapOfNM, n, m, x, y, a, b, c, d) => {
  return -1;
};
