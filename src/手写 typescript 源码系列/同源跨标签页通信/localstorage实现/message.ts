/**
 * localStorage 实现跨标签页通信
 */
/**
 * 发送消息到其他同源标签页
 * @param type
 * @param payload
 */
export function sendMsg(type: string, payload: AnyObject) {
  window.localStorage.setItem(
    `@@${type}`,
    JSON.stringify({
      payload,
      id: Date.now()
    })
  );
}

/**
 * 在其他同源页面监听消息
 * @param handler
 * @returns
 */
export function listenMsg(handler: Function) {
  const storageHandler = (event: StorageEvent) => {
    const data = JSON.parse(event.newValue as string);
    handler(event.key?.substring(2), data.payload);
  };
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener('storage', storageHandler);
  };
}
