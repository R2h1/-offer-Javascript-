const DISTANCE = 150;
const DURATION = 1000;
const animationMap = new WeakMap<Element, Animation>();
const iob = new window.IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target) as Animation;
      animation.play();
      iob.unobserve(entry.target);
    }
  }
});

function isBelowViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}

export default {
  mounted(el: Element) {
    if (!isBelowViewport(el)) {
      return;
    }
    const animation = el.animate(
      [
        {
          opacity: 0.5,
          transform: `translateY(${DISTANCE})`
        },
        {
          opacity: 1,
          transform: 'translateY(0)'
        }
      ],
      {
        duration: DURATION,
        easing: 'ease'
      }
    );
    animation.pause();
    animationMap.set(el, animation);
    iob.observe(el);
  },
  unmounted(el: Element) {
    iob.unobserve(el);
  }
};
