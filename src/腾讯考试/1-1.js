/*
由26个任意小写字母组成的字符串中，若存在首尾对称（a和z，b和y等）的字符，则称为对称字符串。
现输入一个任意小写字母组成的字符串，判断该字符串是否是对称字符串，
如果是对称字符串，则输出对称字符的组数，否则输出0。
（注：
1.不考虑重复组，例如a和z、z和a只能算一组对称字符；
2.不考虑重复字母，例如字符串aazzz，只能算一组az为对称字符组
）
*/

function isSymmetryStr(str) {
  let helpObj = {};
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let num = str[i].charCodeAt();
    helpObj[num] = str[i];
  }
  let count = 0;
  for (let item in helpObj) {
    let symmetryNum = (219 - parseInt(item)).toString();
    if (symmetryNum in helpObj) {
      delete helpObj[item];
      count++;
    }
  }
  return count;
}

var str = 'aabqzyw';
console.log(isSymmetryStr(str));
