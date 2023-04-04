const doms = {
  container: document.querySelector('.container'),
  items: document.querySelectorAll('.container .item'),
};
function init() {
  // 容器半径
  const rContainer = doms.container.clientWidth / 2;
  // item 数量
  const count = doms.items.length - 1;
  // 每个 item 所占用弧度
  const pieceRadian = (360 / count) * (Math.PI / 180);

  for (let i = 0; i < count; i++) {
    const iRadian = pieceRadian * i;
    const x = Math.sin(iRadian) * rContainer;
    const y = -Math.cos(iRadian) * rContainer;
    // 设置样式的时候不要在末尾加 “;”
    doms.items[i].style.transform = `translate(${x}px, ${y}px)`;
  }
}
window.addEventListener('resize', init);
init();
