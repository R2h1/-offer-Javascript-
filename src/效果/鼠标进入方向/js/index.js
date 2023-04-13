function init() {
  const container = document.querySelector('.container');
  const { height, width } = container.getBoundingClientRect();
  const standardRadian = Math.atan(height / width);

  container.addEventListener('mouseenter', function (e) {
    const x = e.offsetX - width / 2;
    const y = height / 2 - e.offsetY;
    // 与 x 轴正方向夹角
    const pointRadian = Math.atan2(y, x);
    let direction;
    if (-standardRadian <= pointRadian && pointRadian < standardRadian) {
      direction = 'right';
    } else if (-Math.PI + standardRadian <= pointRadian && pointRadian < -standardRadian) {
      direction = 'down';
    } else if (Math.PI - standardRadian <= pointRadian || pointRadian < -Math.PI + standardRadian) {
      direction = 'left';
    } else {
      direction = 'up';
    }
    container.textContent = `鼠标进入方向：${direction}`;
  });

  container.addEventListener('mouseleave', function (e) {
    container.textContent = '鼠标移出';
  });
}

init();
