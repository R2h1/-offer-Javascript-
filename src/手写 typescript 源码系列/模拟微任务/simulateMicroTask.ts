/**
 * 异步执行一个函数fn
 * 如果可以，尽量将函数放入微队列中
 * @param fn 无参、无返回
 */
export function asyncRun(fn: () => void) {
  if (typeof Promise !== 'undefined') {
    Promise.resolve().then(fn);
  } else if (typeof MutationObserver !== 'undefined') {
    const mob = new MutationObserver(fn);
    const textNode = document.createTextNode('0');
    mob.observe(textNode, {
      characterData: true,
    });
    textNode.data = '1';
  } else {
    setTimeout(fn);
  }
}
