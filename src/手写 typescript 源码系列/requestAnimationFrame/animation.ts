/**
 * animation 函数接受 3 个描述动画的基本参数：
 *      timing: 时间函数，传入一个已过去的时间与总时间之比的小数（0 代表开始，1 代表结束），返回动画完成度（0 代表开始，1 代表结束）
 *      draw: 绘制函数，传入动画完成度（0 代表开始，1 代表结束），并绘制
 *      duration: 动画总时间
 *      isInfinite: 是否无限动画
 */
function animation({
  timing,
  draw,
  duration,
  isInfinite = false,
  delay = 0,
}: {
  timing: (pass: number) => number;
  draw: (progress: number) => void;
  duration: number;
  isInfinite: boolean;
  delay: number;
}) {
  let start = performance.now();
  window.requestAnimationFrame(function animate(time) {
    const advanceTime = delay < 0 ? -delay * duration : 0;
    // timeFraction 从 0 增加到 1
    let timeFraction = ((time + advanceTime - start) % duration) / duration;
    // 有限动画且已过去时间超过总时间
    if (!isInfinite && timeFraction > 1) {
      timeFraction = 1;
    }
    // 计算当前动画状态
    const progress = timing(timeFraction);

    draw(progress); // 绘制

    if (isInfinite) {
      // 无限动画
      window.requestAnimationFrame(animate);
    } else if (timeFraction < 1) {
      // 有限动画
      window.requestAnimationFrame(animate);
    }
  });
}

export default animation;
