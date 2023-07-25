/**
 * 获取 [min, max] 范围内的随机整数
 * @param {number} min 随机数的最小值
 * @param {number} max 随机数的最大值
 * @returns {number} 随机数
 * @example
 * getRandom(0, 10);获取[0, 10]之间的随机整数
 */
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * 根据 id 随机返回当前 id 之前有多少个视频
 * @param {number} id
 * @returns
 */
function getOffset(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getRandom(0, id));
    }, 100);
  });
}

/**
 * 根据页码和页大小获取视频数据
 * @param {Number} page
 * @param {Number} pageSize
 */
function getVideos(page, pageSize) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {}, 500);
  });
}
