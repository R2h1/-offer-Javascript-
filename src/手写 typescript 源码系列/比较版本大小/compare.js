/**
 * 比较两个应用版本的大小：1.2.4 < 1.3.0.alpha.1 < 1.3.0.alpha.2 < 1.3.0.beta.1 < 1.3.0.rc.1 < 1.3.0
 * @param {*} v1
 * @param {*} v2
 * @return v1 > v2: 1; v1 < v2: 0; v1 = v2:0
 */
const compareVersion = function (v1, v2) {
  v1 = versionHandler(v1);
  v2 = versionHandler(v2);

  let length = Math.max(v1.length, v2.length);
  while (v1.length < length) v1.push('0');
  while (v2.length < length) v2.push('0');
  console.log(v1, v2);
  let i = 0;
  while (i < length) {
    let num1 = parseInt(v1[i]);
    let num2 = parseInt(v2[i]);
    if (num1 > num2) return 1;
    else if (num1 < num2) return -1;
    else i++;
  }
  return 0;
};

// 版本字符串替换并以'.'来split成数组
const versionHandler = function (v) {
  return v.replace('alpha', -3).replace('beta', -2).replace('rc', -1).split('.');
};
console.log(compareVersion('1.3.0', '1.3.2'));
