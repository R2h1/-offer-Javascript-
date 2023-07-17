/**
 * 创建支持超时的fetch
 * @param {number} timeout 超时时间，单位ms
 * @returns 支持超时的 fetch
 * @example
 *  const newFetch = createFetch(1000); 请求 1s 未响应则拒绝
 */
function createFetchWithTimeout(timeout: number) {
  return (input: RequestInfo | URL, init: RequestInit = {}) => {
    return new Promise((resolve, reject) => {
      // 如果需要取消上一次请求，则需要在 input 和 init 相同且创建 abortController 之前去执行 abortController && abortController.abort()
      const abortController = new AbortController();
      try {
        fetch(input, {
          ...init,
          signal: abortController.signal
        }).then(resolve, reject);
      } catch (error) {
        console.error(error);
      }
      // 超时中止请求
      setTimeout(() => {
        reject(new Error('fetch timeout'));
        abortController.abort();
      }, timeout);
    });
  };
}
