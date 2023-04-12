function searchInsertPosition(nums, target) {
  // write code here
  let len = nums.length;
  if (nums[len - 1] < target) {
    return len;
  }
  let res;
  let left = 0,
    right = len - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      left = mid;
      break;
    } else if (nums[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return left;
  // for (let i = 0; i < len; i++) {
  //     if (nums[i] >= target) {
  //         res = i
  //         break
  //     }
  // }
  // return res
}

let nums = [1, 3, 5, 6];

console.log(searchInsertPosition(nums, 1));
