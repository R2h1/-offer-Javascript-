/**
 * 同步方式实现事件监听
 * @param cssSelector css 选择器字符串
 * @returns
 * @example
 *   (async () => {
 *     const btn = syncEventListener('.btn');
 *     while (1) {
 *       await btn.waitClick;
 *       console.log('按钮被点击了');
 *     }
 *   })();
 */
export function syncEventListener(cssSelector: string) {
  const dom = document.querySelector(cssSelector) as Element;
  const domProxy = new Proxy(dom, {
    get(target, key: keyof Element) {
      if (!key.startsWith('wait')) {
        return target[key];
      }
      const eventString = key.replace('wait', '').toLowerCase();
      return new Promise((resolve) => {
        target.addEventListener(eventString, resolve, {
          once: true
        });
      });
    }
  });
  return domProxy;
}
