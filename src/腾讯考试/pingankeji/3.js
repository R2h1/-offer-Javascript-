// 数组去重
function getUnique(arr) {
  // write code here
  if (!Array.isArray(arr)) {
    return false;
  }
  let uniqueArr = [];
  let helpObj = {};
  for (let item of arr) {
    if (Array.isArray(item)) {
      item = item.sort((a, b) => a - b);
    }
    if (Object.prototype.toString.call(item) === '[object Object]') {
      let newObj = {};
      Object.keys(item)
        .sort()
        .forEach((key) => {
          newObj[key] = item[key];
        });
      item = newObj;
    }
    let key = typeof item + JSON.stringify(item) + item;
    if (!helpObj[key]) {
      uniqueArr.push(item);
      helpObj[key] = true;
    }
  }
  return uniqueArr.sort();
}

let arr = [];
console.log(getUnique(arr));
