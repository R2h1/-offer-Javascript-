function solution(data) {
  // write code here
  let stack1 = [];
  let stack2 = [];
  let len = data.length;
  if (len === 0) {
    return true;
  }
  if (data[0] === ']') {
    return false;
  }
  if (data[0] === '[') {
    stack1.push(data[0]);
  } else {
    stack2.push(data[0]);
  }
  let i = 1;
  while (i < len) {
    while (data[i] !== ']') {
      if (data[i] === '.') {
        stack2.push(data[i]);
      } else {
        stack1.push(data[i]);
      }
      i++;
    }
    if (stack1.length === 0 && stack2.length === 0) {
      break;
    }
    if (stack1.length !== 0) {
      stack1.pop();
    } else if (stack1.length === 0 && stack2.length !== 0) {
      stack2.pop();
    }
    i++;
  }
  if (i === len && stack1.length === 0) {
    return true;
  }
  return false;
}

function solution(data) {
  // write code here
  let len = data.length;

  if (len === 0) {
    return true;
  }
  if (data[0] === ']') {
    return false;
  }
  if (data[0] === '[') {
    stack1.push(data[0]);
  } else {
    stack2.push(data[0]);
  }
}

console.log(solution('[[][[.]][.]]'));
