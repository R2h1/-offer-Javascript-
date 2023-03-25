/**
 *
 * @param { Object } obj
 */
function observe(obj) {
  for (const key in obj) {
    let internalValue = obj[key];
    const fns = new Set();
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集：记录哪些函数使用到 key 属性
        const wrapperFn = window.__func;
        if (wrapperFn && !fns.has(wrapperFn)) {
          fns.add(wrapperFn);
        }
        return internalValue;
      },
      set(val) {
        internalValue = val;
        // 派发更新：运行这些使用 key 属性的函数
        for (const fn of fns) {
          fn();
        }
      },
    });
  }
}

/**
 * 包装每个函数
 */
function wrapperRun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}
