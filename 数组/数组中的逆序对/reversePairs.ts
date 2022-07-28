/**
 * 题目描述：
 *      在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
 *  分析：
 *      
 */

// 暴力法(超时)
function reversePairs(nums: number[]): number {
    let count = 0;
    const len = nums?.length;
    for (let i = 0; i < len; i++) {
        const base = nums[i]
        for (let j = i + 1; j < len; j++) {
            const compare = nums[j]
            if (compare < base) {
                count = count + 1
            }
        }
    }
    return count;
}