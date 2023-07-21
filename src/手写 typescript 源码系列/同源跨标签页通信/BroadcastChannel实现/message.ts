/**
 * BroadcastChannel 实现跨标签页通信
 */
const channel = new BroadcastChannel('example');

/**
 * 发送消息到其他同源标签页
 * @param type
 * @param payload
 */
export function sendMsg(type: string, content: AnyObject) {
  channel.postMessage({
    type,
    content
  });
}

/**
 * 在其他同源页面监听消息
 * @param handler
 * @returns
 */
export function listenMsg(callback: (data: any) => void) {
  const handler = <T>(e: MessageEvent<T>) => {
    callback?.(e.data);
  };
  channel.addEventListener('message', handler);
  return () => {
    channel.removeEventListener('message', handler);
  };
}
