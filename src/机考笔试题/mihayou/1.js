/**
 打印蛇形矩阵
 */

const printSnakeMatrix = (M, N) => {
  for (let i = 1; i <= M; i++) {
    let tmp = [];
    for (let j = 1; j <= N; j++) {
      let num = (i - 1) * N + j;
      if (num % 26 === 0) {
        num = 26;
      } else {
        num = num % 26;
      }
      tmp.push(num);
    }

    console.log(...tmp);
  }
};

console.log(printSnakeMatrix(5, 8));

const regMatch = (s, p) => {
  let modeArr = p.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*)|$))/g);
  let cur = 0;
  let sLen = s.length,
    modeLen = modeArr.length;
  for (let i = 0; i < modeLen; i++) {
    let m = modeArr[i].split('');
    if (m[1] === '*') {
      if (m[1] === '.') {
        cur = strLen;
        break;
      } else {
        while (s[cur] === m[0]) {
          cur++;
        }
      }
    } else {
      let mLen = m.length;
      for (let j = 0; j < mLen; j++) {
        if (m[j] !== s[cur]) {
          return false;
        } else {
          cur++;
        }
      }
    }
  }
  return cur === strLen;
};
console.log();

function match1(s, pattern) {
  return new RegExp('^' + pattern + '$', 'g').test(s);
}

function match2(s, pattern) {
  if (!pattern) return !s;
  if (pattern[1] == '*') {
    return (
      match2(s, pattern.substr(2)) || (s && (s[0] == pattern[0] || pattern[0] == '.') && match2(s.substr(1), pattern))
    );
  } else {
    return s && (s[0] == pattern[0] || pattern[0] == '.') && match2(s.substr(1), pattern.substr(1));
  }
}

var s = 'aaa',
  pattern = 'ab*ac*a';
console.log(match1(s, pattern));
console.log(match2(s, pattern));
