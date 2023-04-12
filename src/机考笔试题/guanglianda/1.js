/**
 * 杰夫非常喜欢种草，他自己有一片草地，为了方便起见，我们把这片草地看成一行从左到右，
 * 并且第 i 个位置的草的高度是hi。杰夫在商店中购买了m瓶魔法药剂，
 * 每瓶魔法药剂可以让一株草长高x，杰夫希望每次都能有针对性的使用药剂，
 * 也就是让当前长得最矮的小草尽量高，
 * 现在杰夫想请你告诉他在使用了m瓶魔法药剂之后，最矮的小草在这种情况下最高能到多少。
 * 输入描述
 * 第一行三个整数n, m, x分别表示小草的个数，魔法药剂的个数以及每瓶魔法药剂让小草长高的高度。
 * (1 ≤ n, m, x ≤ 1e5)
 * 第二行n个整数分别表示第i株小草的高度ai。(1≤ai≤1e9)
 * 输出描述
 * 使用了m瓶药剂之后最矮的小草的最高高度。
 * 样例输入
 * 3 1 1
 * 1 2 3
 * 样例输出
 * 2
 */

let n = 3,
  m = 4,
  x = 1;
let heigth = new Array(n);
for (let i = 0; i < n; i++) {
  heigth[i] = i + 1;
}

const arrivedHeight = (height, m, n, x) => {
  let minIndex = minHeight(heigth, n);
  let index = minIndex;
  while (m > 0) {
    height[index] += x;
    index = minHeight(heigth, n);
    m -= 1;
  }
  return height[minIndex];
};

const minHeight = (heigth, n) => {
  let minIndex = 0,
    min = heigth[0];
  for (let i = 0; i < n; i++) {
    if (heigth[i] < min) {
      minIndex = i;
    }
  }
  return minIndex;
};

console.log(arrivedHeight(heigth, m, n, x));
