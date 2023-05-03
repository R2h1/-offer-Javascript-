const map = new WeakMap();
const rob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { handler, args } = map.get(entry.target);
    if (typeof handler !== 'function') {
      handler(entry);
    }
  }
});

export default {
  mounted(el: Element, binding: any) {
    // 监听尺寸变化
    rob.observe(el);
    map.set(el, binding);
  },
  unmounted(el: Element) {
    // 取消监听
    rob.unobserve(el);
  },
};
