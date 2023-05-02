/**
 * 发出请求，返回Promise
 * @param {string} url 请求地址
 * @param {number} maxCount 最大重试次数
 * @returns
 */
function request(url: string, maxCount = 3): Promise<any> {
  return fetch(url).catch((err) => {
    if (maxCount <= 0) {
      return Promise.reject(err);
    } else {
      return request(url, maxCount - 1);
    }
  });
}

/**
 * 异步方法重试
 * @param func 重试的函数
 * @param maxCount 最大重试次数
 * @param args 传递给 func 的参数
 * @returns
 */
function retry(func: (...args: any[]) => Promise<any>, maxCount = 3, ...args: any[]): Promise<any> {
  return func(...args).catch((err) => {
    if (maxCount <= 0) {
      return Promise.reject(err);
    } else {
      return retry(func, maxCount - 1, ...args);
    }
  });
}
