export function myAjax({
  url = '',
  type = 'GET',
  dataType = 'json',
  data = null,
  success = (xhr: XMLHttpRequest) => {},
  fail = (xhr: XMLHttpRequest) => {},
  downProgress = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {},
  upProgress = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {}
} = {}) {
  // 1、创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();
  // 2、发送请求
  if (type.toUpperCase() === 'GET') {
    xhr.open('GET', url + '?' + data, true);
  } else if (type === 'POST') {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
      success?.(this);
    } else {
      fail?.(this);
    }
  };
  // 响应进度
  xhr.addEventListener('progress', (e) => {
    downProgress(e);
  });
  // 请求进度
  xhr.upload.addEventListener('progress', (e) => {
    upProgress(e);
  });
  xhr.onerror = function () {
    fail?.(this);
  };
  xhr.send(data);
}

/**
 * fetch 不支持上传进度的获取，因为 ReadableStream 只能被一方读取，而请求的 body 已被浏览器读取
 *  可以参考 ServiceWorker 中的 BackgroundFetchManager，但目前仍在试验中(firefox、safari 不支持)，不推荐用于生产环境
 * @param {object} param0
 * @param {string} param0.url 请求url
 * @param {'GET'|'POST'} param0.method 请求方法
 * @license MIT
 * @author rrh <1461694018@qq.com>
 * @returns
 */
export function myFetch({
  url = '',
  method = 'GET',
  data = null,
  downProgress = (e: { loaded: number; total: number }) => {}
} = {}) {
  return new Promise(async (resolve, reject) => {
    const resp = await fetch(url, {
      method,
      body: data
    });
    const total = Number(resp.headers.get('content-length'));
    if (resp.body) {
      let loaded = 0;
      let body = '';
      const reader = resp.body.getReader(); // 流式读取
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        loaded = loaded + value.length;
        body = body + decoder.decode(value);
        downProgress({
          loaded,
          total
        });
      }
      resolve(body);
    }
  });
}
