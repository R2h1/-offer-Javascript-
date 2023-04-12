var inputObj = JSON.parse('{"1":123,"2":234,"8":456}');
console.log(inputObj);
let indexs = [];
for (let key of Object.keys(inputObj)) {
  let index = parseInt(key) - 1;
  indexs.push(index);
}
indexs = indexs.sort();
let len = indexs[indexs.length - 1] + 1;
let res = new Array(len);
console.log(indexs);
for (let i = 0; i < len; i++) {
  if (indexs.indexOf(i) !== -1) {
    console.log(i + 1);
    res[i] = inputObj[i + 1];
  } else {
    res[i] = 0;
  }
}
console.log(JSON.stringify(res));
