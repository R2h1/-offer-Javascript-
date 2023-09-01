/**
 *  for (初始代码; 条件代码; 循环代码) {
 *    // 循环体
 *  }
 *
 *  function m () {
 *    初始代码;
 *    function _m() {
 *      if (!条件代码) {
 *        return;
 *      }
 *      // 循环体
 *      循环代码;
 *      _m();
 *    }
 *    _m();
 *  }
 */

// 对数组求和，不能使用循环，不能调用数组中的方法
function sum1(arr: number[], i = 0): number {
  if (i === arr.length) return 0;
  return arr[i] + sum1(arr, i + 1);
}

function sum2(arr: number[]) {
  let sum = 0;
  let i = 0;
  function _sum() {
    if (i >= arr.length) return;
    sum += arr[i];
    i++;
    _sum();
  }
  _sum();
  return sum;
}
