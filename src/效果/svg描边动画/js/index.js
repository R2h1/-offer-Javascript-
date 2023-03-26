const doms = {
  container: document.querySelector('.container'),
};
document.addEventListener('DOMContentLoaded', function () {
  const pathElements = doms.container.querySelectorAll('svg path');
  const pathLenSet = new Set();
  for (const pathElement of pathElements) {
    const pathLen = Math.floor(pathElement.getTotalLength());
    pathElement.style.animation = `move${pathLen} 1s`;
    if (!pathLenSet.has(pathLen)) {
      document.styleSheets[0].insertRule(`
        @keyframes move${pathLen} {
          0%{
            stroke-dashoffset: ${pathLen};
          }
          100%{
            stroke-dashoffset: 0;
          }
        }
      `);
    }
  }
});

doms.container.addEventListener(
  'mouseenter',
  function (e) {
    if (e.target.className === 'item') {
      const pathElements = e.target.querySelectorAll('path');
      for (const pathElement of pathElements) {
        const pathLen = Math.floor(pathElement.getTotalLength());
        pathElement.style.animation = `move${pathLen} 1s`;
      }
    }
  },
  true
);

doms.container.addEventListener('animationend', function (e) {
  if (e.target.tagName === 'path') {
    e.target.style.animation = '';
  }
});
