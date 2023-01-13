function quickSort(nums) {
  function partition(nums, left, right) {
    let index = left + 1;
    for (let i = index; i <= right; i = i + 1) {
      if (nums[i] < nums[left]) {
        i !== index && ([nums[i], nums[index]] = [nums[index], nums[i]]);
        index = index + 1;
      }
    }
    [nums[left], nums[index - 1]] = [nums[index -1], nums[left]];
    return index - 1;
  }

  function quickSortCore(nums, left, right) {
    if (left < right) {
      const partitionIdx = partition(nums, left, right);
      quickSortCore(nums, left, partitionIdx - 1);
      quickSortCore(nums, partitionIdx + 1, right);
    }
  }

  quickSortCore(nums, 0, nums.length - 1);

  return nums;
}