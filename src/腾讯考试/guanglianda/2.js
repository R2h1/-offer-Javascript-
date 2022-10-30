/**
 * 《XX魔法书》中记载，只有魔法师体内地火水风四种元素平衡的时候才是绝对安全的。
 * 某魔法师在给自己做了一个体检，发现自己体内的四种元素数量分别是A，B，C，D，
 * 魔法师慌了，这时他看到魔法书中记载了一种转换魔法，可以把任意两个单位的元素转换成任意一种元素。
 * 请问魔法师是否可以通过这种魔法，在保证自己体内的元素总量尽可能多的情况下，
 * 使得自己体内的四种元素数量完全相同？如果可以，请输出平衡后体内元素总量，如果不能请输出-1。
 * 输入描述
 * 输入仅包含一行，仅包含4个正整数A，B，C，D，分别表示四种元素的数量。(1<=A,B,C,D<=10^17)
 * 输出描述
 * 输出仅包含一个整数,如题所示。
 * 样例输入
 * 1 2 2 4
 * 样例输出
 * 8
 * 提示
 * 只要把第四种元素中的两个转换为第一种元素即平衡.
 */
let a = 2,
  b = 5,
  c = 5,
  d = 2; // 使得四种元素完全相同
const BalanceTotal = (a, b, c, d) => {
  let arr = [a, b, c, d];
  let minMaxIndex = minMax(arr);
  while (arr[minMaxIndex[0]] !== arr[minMaxIndex[1]]) {
    if (arr[minMaxIndex[1]] - arr[minMaxIndex[0]] === 1) break;
    arr[minMaxIndex[0]] += 1;
    arr[minMaxIndex[1]] -= 2;
    minMaxIndex = minMax(arr);
  }
  let total = arr[0] + arr[1] + arr[2] + arr[3];
  if (total % 4 === 0) return total;
  return -1;
};

const minMax = (arr) => {
  let minIndex = 0,
    maxIndex = 0,
    min = arr[0],
    max = arr[0];
  for (let i = 0; i < 4; i++) {
    if (arr[i] < min) {
      minIndex = i;
    }
    if (arr[i] > max) {
      maxIndex = i;
    }
  }
  return [minIndex, maxIndex];
};
console.log(BalanceTotal(a, b, c, d));
