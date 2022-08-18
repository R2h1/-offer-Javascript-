// 计数排序
function countingSort1(nums: number[]): number[] {
    const len = nums.length;
    const max = Math.max(...nums);
    const min = Math.min(...nums);
    const counterLen = max - min + 1;
    const counter = new Array(counterLen).fill(0);
    // 统计出现次数
    for (let i = 0; i < len; i++) {
        const index = nums[i] - min;
        counter[index] = counter[index] + 1;
    }
    let sortedIndex = 0;
    
    for (let i = 0; i < counterLen; i++) {
        while (counter[i] > 0) {
            nums[sortedIndex] = i + min;
            sortedIndex = sortedIndex + 1;
            counter[i] = counter[i] - 1;
        }
    }
    return nums;
}

// 计数排序
function countingSort2(nums: number[]): number[] {
    const len = nums.length;
    const max = Math.max(...nums);
    const min = Math.min(...nums);
    const counterLen = max - min + 1;
    const counter = new Array(counterLen).fill(0);
    // 统计出现次数
    for (let i = 0; i < len; i++) {
        const index = nums[i] - min;
        counter[index] = counter[index] + 1;
    }
    // 累加统计值
    for (let i = 1; i < len; i++) {
        counter[i] = counter[i] + counter[i - 1];
    }
    const sortedNums = new Array(len);
    for (let i = 0; i < len; i++) {
        const index = counter[nums[i] - min];
        sortedNums[index - 1] = nums[i];
        counter[index] = counter[index] - 1;
    }
    return nums;
}