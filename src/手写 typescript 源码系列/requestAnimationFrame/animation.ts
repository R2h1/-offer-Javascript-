/**
 * animation 函数接受 3 个描述动画的基本参数：
 *      timing: 时间函数，传入一个已过去的时间与总时间之比的小数（0 代表开始，1 代表结束），返回动画完成度（0 代表开始，1 代表结束）
 *      draw: 绘制函数，传入动画完成度（0 代表开始，1 代表结束），并绘制
 *      duration: 动画总时间
 */
function animation({
  timing,
  draw,
  duration,
}: {
  timing: (pass: number) => number;
  draw: (progress: number) => void;
  duration: number;
}) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    // 计算当前动画状态
    const progress = timing(timeFraction);

    draw(progress); // 绘制

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

export default animation;
