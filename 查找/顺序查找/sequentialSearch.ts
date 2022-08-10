// 哨兵法
function sequentialSearch(nums: number[], target: number): number {
    nums.push(target);
    let i = 0;
    while (nums[i] !== target) {
        i = i + 1;
    }
    return i === nums.length - 1 ? -1 : i;
}