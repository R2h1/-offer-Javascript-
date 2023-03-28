/**
 * 异步执行一个函数fn
 * 如果可以，尽量将函数放入微队列中
 * @param fn 无参、无返回
 */
export function asyncRun(fn: () => void) {
  if (typeof Promise !== 'undefined') {
    // ie不支持 Promise
    Promise.resolve().then(fn);
  } else if (typeof MutationObserver !== 'undefined') {
    // ie11+ 才支持MutationObserver
    const mob = new MutationObserver(fn);
    // 创建一个文本节点
    const textNode = document.createTextNode('0');
    // 监听文本节点的 data
    mob.observe(textNode, {
      characterData: true,
    });
    // 修改文本节点 data 触发回调
    textNode.data = '1';
  } else {
    setTimeout(fn);
  }
}
