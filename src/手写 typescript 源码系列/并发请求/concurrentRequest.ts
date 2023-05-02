/**
 * 并发请求
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxCount 最大并发数
 * @returns
 */
function concurrentRequest(urls: string[], maxCount = 3): Promise<(Response | unknown)[]> {
  return new Promise((resolve) => {
    const total = urls.length;
    const res: (Response | unknown)[] = [];
    if (total === 0) {
      resolve(res);
      return;
    }
    let nextIndex = 0; // 即将发送请求的下标
    let finishedCount = 0; // 当前完成的请求数量
    async function request() {
      if (nextIndex === total) {
        return;
      }
      const reqIndex = nextIndex;
      const url = urls[reqIndex];
      nextIndex = nextIndex + 1;
      try {
        const resp = await fetch(url);
        res[reqIndex] = resp;
      } catch (err) {
        res[reqIndex] = err;
      } finally {
        // 当前请求结束
        finishedCount = finishedCount + 1;
        if (finishedCount === total) {
          resolve(res);
        }
        request();
      }
    }
    maxCount = Math.min(maxCount, total); // 最大并发数
    for (let i = 0; i < maxCount; i++) {
      request();
    }
  });
}
