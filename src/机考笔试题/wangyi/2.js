function solution(harmList, totalHarm) {
  // write code here
  harmList.sort();
  if (totalHarm < harmList[0]) {
    return -1;
  }
  let len = harmList.length;
  let count = 0;
  while (totalHarm > 0) {
    let index;
    for (let i = len - 1; i >= 0; i--) {
      if (harmList[i] <= totalHarm) {
        index = i;
        break;
      }
    }
    totalHarm = totalHarm - harmList[index];
    count++;
  }
  if (totalHarm === 0) {
    return count;
  }
  return -1;
}

let harmList = [3, 2];

let totalHarm = 1;

console.log(solution(harmList, totalHarm));
