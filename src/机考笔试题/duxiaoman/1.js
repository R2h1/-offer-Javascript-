const getCount = (S, T) => {
  let sLen = S.length;
  let tLen = T.length;
  let helpObj = {};
  for (let i = 0; i < sLen; i++) {
    if (!helpObj[S[i]]) {
      helpObj[S[i]] = 1;
    } else {
      helpObj[S[i]] = helpObj[S[i]] + 1;
    }
  }
  let count = 0;
  for (let i = 0; i < tLen; i++) {
    if (!helpObj[T[i]]) {
      continue;
    }
    if (helpObj[T[i]] > 0) {
      helpObj[T[i]]--;
      count++;
    }
  }
  return count;
};

let S = 'AAB',
  T = 'ABC';

console.log(getCount(S, T));
