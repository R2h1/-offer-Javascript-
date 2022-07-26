
/**
 * 题目描述：
 *      请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 *  分析：
 *      例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。  
 *      注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
 *      前一段的元素一定大于等于后一段的元素，因此，最小数字一定是第一段升序元素末尾的下一个元素。
 */

// 正则表达式
function replaceSpace1(s: string): string {
    return s.replace(/' '/g/* new RegExp(' ', 'g') */, '%20');
};

// 暴力法
function replaceSpace2(s: string): string {
    let res = '';
    let len = s.length;
    for (let i = 0; i < len; i++) {
        res += s[i] === ' ' ? '%20' : s[i];
    }
    return res;
};

// split + map + join
function replaceSpace3(s: string): string {
    return s.split(' ').map((item) => {
        return item === ' ' ? '%20' : item;
    }).join('');
}