const container = document.querySelector('.container-js');
const detail = document.querySelector('.detail-js');

container.addEventListener('mouseenter', function (e) {
  detail.style.transition = 'none';
  detail.style.height = 'auto';
  const height = detail.offsetHeight;
  detail.style.height = 0;
  window.requestAnimationFrame(() => {
    detail.style.transition = '1s';
    detail.style.height = `${height}px`;
  });
});

container.addEventListener('mouseleave', function (e) {
  detail.style.transition = '1s';
  detail.style.height = 0;
});

/**
 * 到 chrome 调试控制台将事件监听移除，就可以复制了
 */
document.addEventListener('copy', (e) => {
  e.clipboardData.setData('text/plain', '不准复制，直接打钱!');
  e.preventDefault();
  console.log(e.target);
});
