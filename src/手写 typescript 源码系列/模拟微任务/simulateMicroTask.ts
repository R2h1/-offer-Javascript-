/**
 * 异步执行一个函数fn
 * 如果可以，尽量将函数放入微队列中
 * @param {Function} fn 无参、无返回
 */
export function asyncRun(fn: () => void) {
  // ie 不支持 Promise, queueMicrotask
  // ie11+ 才支持MutationObserver
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(fn);
    return;
  }
  if (typeof Promise === 'function') {
    Promise.resolve().then(fn);
    return;
  }
  if (typeof MutationObserver === 'function') {
    const mob = new MutationObserver(fn);
    // 创建一个文本节点
    const textNode = document.createTextNode('0');
    // 监听文本节点的 data
    mob.observe(textNode, {
      characterData: true
    });
    // 修改文本节点 data 触发回调
    textNode.data = '1';
    return;
  }
  // node 环境
  if (process && typeof process.nextTick === 'function') {
    process.nextTick(fn);
    return;
  }
  if (typeof setImmediate === 'function') {
    setImmediate(fn);
    return;
  }
  setTimeout(fn);
}
