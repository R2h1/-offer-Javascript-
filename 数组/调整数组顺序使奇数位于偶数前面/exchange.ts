/**
 * 题目描述：
 *      输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分
 *  分析：
 */

// 暴力解法(支持)
function exchange1(nums: number[]): number[] {
    const left: number[] = [];
    const right: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        element & 1 ? left.push(element) : right.push(element);
    }
    return left.concat(right);
};

// 左右指针
function exchange2(nums: number[]): number[] {
    let left = 0;
    let right = nums.length - 1;
    while(left < right) {
        if (!(nums[left] & 1) && (nums[right] & 1)) { // 左边是偶数，右边是奇数，进行交换
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left = left + 1;
            right = right - 1;
            continue
        } 
        while(nums[left] & 1 && left < right) { // 左指针是奇数
            left = left + 1;
        }
        while(!(nums[right] & 1) && left < right) { // 右指针是偶数
            right = right - 1;
        }
    }
    return nums;
};

// 快慢指针
function exchange3(nums: number[]): number[] {
    let slow = 0;
    let fast = 0;
    while(fast < nums.length) {
        if (nums[fast] & 1) {  // 快指针是奇数
            slow !== fast && ([nums[slow], nums[fast]] = [nums[fast], nums[slow]]); // 排除自我交换
            slow = slow + 1;
        }
        fast = fast + 1;
    }
    return nums;
};

