function initClock() {
  const clock = document.querySelector('.clock');
  const { hours, minutes, seconds } = getCurrentTime();
  clock.style.setProperty('--seconds', seconds);
  clock.style.setProperty('--minutes', minutes + seconds / 60);
  clock.style.setProperty('--hours', hours + minutes / 60 + seconds / 3600);
}

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { hours, minutes, seconds };
}

initClock();

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

animation({
  timing: (x) => x,
  draw: (progress) => {
    const value = Math.floor(progress * 60);
    const counter = document.querySelector('.counter');
    counter.textContent = '秒: ' + String(value).padStart(2, '0');
  },
  delay: -(new Date().getSeconds() / 60),
  duration: 60000,
  isInfinite: true
});
