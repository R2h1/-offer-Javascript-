type Channel = BroadcastChannel & {
  id: number;
  listeners: Set<number>;
};
function createId(name: string) {
  const key = `channel-${name}`;
  let id = Number(localStorage.getItem(key));
  if (!id) {
    id = 0;
  }
  id = id + 1;
  localStorage.setItem(key, String(id));
  return id;
}

function sendMsg(msg: string, channel: Channel) {
  channel.postMessage({
    id: channel.id,
    msg,
  });
}

/**
 * 如何使用？
 *
 *  当前标签页：
 * const channel = createChannel('music');
 * btn.addEventListener('click', () => {
 *   if (channel.listeners.size === 0) { // 没有其他同源标签页打开，则新建标签页
 *     window.open('', '_blank');
 *   } else { // 否则，发送消息给其他标签页
 *     channel.postMessage({
 *       musicName: e.target.dataset.name
 *     })
 *   }
 * })
 *
 *  其他标签页
 * const channel = createChannel('music');
 * channel.addEventListener('message', (e) => {
 *    const { musicName } = e.data;
 *    if (musicName) {
 *       play(musicName);
 *    }
 * })
 */
function createChannel(name: string) {
  const channel = new BroadcastChannel(name) as Channel;
  channel.id = createId(name);
  channel.listeners = new Set();
  sendMsg('open', channel);
  window.addEventListener('unload', () => {
    sendMsg('close', channel);
  });
  channel.addEventListener('message', (e) => {
    const { msg, id } = e.data;
    if (msg === 'open') {
      // 收到某个新开标签页的通知
      sendMsg('replay', channel);
      channel.listeners.add(id); // 将新开标签页的 id 加入集合
    } else if (msg === 'replay') {
      // 本新开标签页收到其他所有同源标签页的回复
      channel.listeners.add(id); // 将回复的标签页的 id 加入集合
    } else if (msg === 'close') {
      // 收到某个标签页关闭的通知
      channel.listeners.delete(id); // 将关闭的标签页的 id 移出集合
    }
  });
  return channel;
}
