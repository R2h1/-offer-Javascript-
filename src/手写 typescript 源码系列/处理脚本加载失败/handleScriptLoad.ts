const domains = ['example1.com', 'example2.com', 'example3.com']; // 替换的域名
const maxRetry = 3;
const retryInfo = new Map();
/**
 * error 事件不冒泡，需要监听在捕获阶段
 */
window.addEventListener(
  'error',
  function (e) {
    const target = e.target as HTMLElement & HTMLScriptElement;
    if (target?.tagName === 'SCRIPT' && !(e instanceof ErrorEvent)) {
      const url = new URL(target.src);
      const pathname = url.pathname;
      if (!retryInfo.get(pathname)) {
        retryInfo.set(pathname, {
          times: 0,
          nextIndex: 0,
        });
      }
      const info = retryInfo.get(pathname);
      if (info.times > maxRetry - 1) {
        return;
      }
      url.host = domains[info.nextIndex];
      info.times = info.times + 1;
      info.nextIndex = (info.nextIndex + 1) % domains.length;
      document.write(`<script src="${url.toString()}"></script>`);
    }
  },
  true
);
