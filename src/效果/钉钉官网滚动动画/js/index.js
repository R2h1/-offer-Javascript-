const items = document.querySelectorAll('.list-item');
const playGround = document.querySelector('.playground');
const list = document.querySelector('.list');

function createAnimation({ scrollStart, scrollEnd, valueStart, valueEnd }) {
  return function (scroll) {
    if (scroll <= scrollStart) {
      return valueStart;
    }
    if (scroll >= scrollEnd) {
      return valueEnd;
    }
    return valueStart + ((valueEnd - valueStart) / (scrollEnd - scrollStart)) * (scroll - scrollStart);
  };
}

const animationMap = new Map();

function getDomAnimation(scrollStart, scrollEnd, dom) {
  scrollStart = scrollStart + dom.dataset.order * 400;
  const opacityAnimation = createAnimation({
    scrollStart,
    scrollEnd,
    valueStart: 0,
    valueEnd: 1,
  });

  const scaleAnimation = createAnimation({
    scrollStart,
    scrollEnd,
    valueStart: 0.5,
    valueEnd: 1,
  });

  // offsetLeft 、offsetTop 是相对于最近定位父元素
  const xAnimation = createAnimation({
    scrollStart,
    scrollEnd,
    valueStart: list.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2,
    valueEnd: 0,
  });

  const yAnimation = createAnimation({
    scrollStart,
    scrollEnd,
    valueStart: list.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2,
    valueEnd: 0,
  });

  const opacity = function (scroll) {
    return opacityAnimation(scroll);
  };

  const transform = function (scroll) {
    return `translate(${xAnimation(scroll)}px, ${yAnimation(scroll)}px) scale(${scaleAnimation(scroll)})`;
  };
  return {
    opacity,
    transform,
  };
}

function updateMap() {
  animationMap.clear();
  const playGroundRect = playGround.getBoundingClientRect();
  const scrollStart = playGroundRect.top + window.scrollY;
  const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
  for (const item of items) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item));
  }
}

function updateStyles() {
  const scroll = window.scrollY;
  for (const [dom, value] of animationMap) {
    for (const cssProp in value) {
      dom.style[cssProp] = value[cssProp](scroll);
    }
  }
}

updateMap();
updateStyles();
window.addEventListener('scroll', updateStyles);
