/**
 * 比较两个应用版本的大小：1.2.4 < 1.3.0.alpha.1 < 1.3.0.alpha.2 < 1.3.0.beta.1 < 1.3.0.rc.1 < 1.3.0
 * @param {*} v1
 * @param {*} v2
 * @return v1 > v2: 1; v1 < v2: 0; v1 = v2:0
 */
const compareVersion = function (v1: string, v2: string) {
  const v1Arr = versionHandler(v1);
  const v2Arr = versionHandler(v2);

  let length = Math.max(v1.length, v2.length);
  while (v1.length < length) v1Arr.push('0');
  while (v2.length < length) v2Arr.push('0');
  console.log(v1Arr, v2Arr);
  let i = 0;
  while (i < length) {
    let num1 = parseInt(v1Arr[i]);
    let num2 = parseInt(v2Arr[i]);
    if (num1 > num2) return 1;
    else if (num1 < num2) return -1;
    else i++;
  }
  return 0;
};

// 版本字符串替换并以'.'来split成数组
const versionHandler = function (v: string): string[] {
  return v.replace('alpha', '-3').replace('beta', '-2').replace('rc', '-1').split('.');
};
console.log(compareVersion('1.3.0', '1.3.2'));

/**
 * 利用迭代器，只遍历一次
 * @param v1
 * @param v2
 * @returns
 */
export function newCompareVersion(v1: string, v2: string) {
  function* traversal(v: string) {
    let part = '';
    const terminals = ['.'];
    const specials = new Map([
      ['alpha', '-3'],
      ['beta', '-2'],
      ['rc', '-1'],
    ]);
    for (let char of v) {
      if (terminals.includes(char)) {
        const special = specials.get(part);
        if (special) {
          part = special;
        }
        yield part;
        part = '';
      } else {
        part = part + char;
      }
    }
    if (part) {
      yield part;
    }
  }
  const v1Iterator = traversal(v1);
  const v2Iterator = traversal(v2);
  while (true) {
    const item1 = v1Iterator.next();
    const item2 = v2Iterator.next();
    // v1迭代结束
    if (item1.done && !item2.done) {
      return -1;
    }
    // v2迭代结束
    if (!item1.done && item2.done) {
      return 1;
    }
    // v1, v2 同时迭代结束
    if (item1.done && item2.done) {
      return 0;
    }
    // v1, v2 均未迭代结束
    if (+item1.value > +item2.value) {
      return 1;
    }
    if (+item1.value < +item2.value) {
      return -1;
    }
  }
}
