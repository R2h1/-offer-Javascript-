/**
 * 创建支持超时的fetch
 * @param {number} timeout 超时时间，单位ms
 * @returns 支持超时的 fetch
 * @example
 *  const newFetch = createFetch(1000); 请求 1s 未响应则拒绝
 */
function createFetch(timeout: number) {
  return (input: RequestInfo | URL, init: RequestInit = {}) => {
    const abortController = new AbortController();
    // 超时中止请求
    setTimeout(() => {
      abortController.abort();
    }, timeout);
    return fetch(input, {
      ...init,
      signal: abortController.signal,
    });
  };
}
