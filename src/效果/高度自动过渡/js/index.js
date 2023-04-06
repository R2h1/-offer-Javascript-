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
