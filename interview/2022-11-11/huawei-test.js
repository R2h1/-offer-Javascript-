
/** 缓存一个报告的成本 */
const cacheCost = 5;
/** 文件序列 */
const files = [2, 2, 2, 2, 2, 5, 2, 2, 2]
/** 扫描文件的成本 */
const scanCosts = ['3', '3', '3', '3', '3', '1', '3', '3', '3'];
/** 统计文件的出现次数和扫描成本 map(file, [扫描成本, 出现次数]) */
function getLeastCost(cacheCost, files, scanCosts) {
    /** 统计文件的出现次数和扫描成本 */
    const fileCountAndScanCosts = new Map();
    for (let i = 0; i < files.length; i++) {
        const scanCost = Number(scanCosts[i]);
        const file = files[i];
        if (fileCountAndScanCosts.has(file)) {
            fileCountAndScanCosts.set(file, [scanCost, fileCountAndScanCosts.get(file)[1] + 1]);
        } else {
            fileCountAndScanCosts.set(file, [scanCost, 1]);
        }
    }
    let ans = 0;
    for (let [_, [scanCost, count]] of fileCountAndScanCosts) {
        // 某文件的缓存情况下的成本
        const cacheCostOfFile = scanCost + cacheCost;
        const nonCacheCostOfFile = count * scanCost;
        if (cacheCostOfFile < nonCacheCostOfFile) {
            ans = ans + cacheCostOfFile;
        } else {
            ans = ans + nonCacheCostOfFile;
        }
    }
    return ans;
}

console.log(getLeastCost(cacheCost, files, scanCosts));

const [m, n] = [5, 4];
// fields: 果林的面积数组
const fields = [5, 7, 9, 19, 10]

function getLeastK(m, n, fields) {
    // 没有果林
    if (m < 1) return 0;
    // 果林个数大于天数 或者 没有天数为 0
    if (m > n || n < 1) return -1;
    const fieldsCopy = fields.slice(0);
    fieldsCopy.sort((a, b) => a - b);
    const extraDays = n - m;
    // 没有额外的天数
    if (extraDays === 0) {
        return fieldsCopy[m - 1];
    }
    let flag;
    let k;
    for (let i =  m - extraDays - 1; i < m; i++) {
        k = fieldsCopy[i];
        // 是否都满足
        flag = true;
        for (let j = i + 1; j < m; j++) {
            if (fieldsCopy[i] * 2 < fieldsCopy[j]) {
                flag = false
                break
            }
        }
        if (flag) {
            break;
        }
    }
    return k;
}


console.log(getLeastK(m, n, fields));