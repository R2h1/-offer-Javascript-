function init() {
  const list = document.querySelector('.list');
  if (list && list.children && list.children.length > 1) {
    list.appendChild(list.children[0].cloneNode(true));
  }

  const duration = 3000;
  const itemHeight = 40;
  let curIndex = 0;
  const moveNext = () => {
    const from = curIndex * itemHeight;
    if (curIndex === list.children.length - 1) {
      curIndex = 0;
      list.scrollTop = curIndex * itemHeight;
      return;
    }
    curIndex = curIndex + 1;
    animation({
      timing: (x) => x,
      draw: (progress) => {
        list.scrollTop = from + progress * itemHeight;
      },
      duration: 500,
    });
  };
  setInterval(moveNext, duration);
}

init();

function animation({ timing, draw, duration, isInfinite = false, delay = 0 }) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // 动画提前时间
    const advanceTime = delay < 0 ? -delay * duration : 0;
    let timeFraction;
    if (isInfinite) {
      // timeFraction 从 0 增加到 1
      timeFraction = ((time + advanceTime - start) % duration) / duration;
    } else {
      // timeFraction 从 0 增加到 1，可能大于1
      timeFraction = (time + advanceTime - start) / duration;
    }
    // 有限动画且已过去时间超过总时间
    if (!isInfinite && timeFraction > 1) {
      timeFraction = 1;
    }
    // 计算当前动画状态
    const progress = timing(timeFraction);
    draw(progress); // 绘制

    if (isInfinite) {
      // 无限动画
      requestAnimationFrame(animate);
    } else if (timeFraction < 1) {
      // 有限动画
      requestAnimationFrame(animate);
    }
  });
}
