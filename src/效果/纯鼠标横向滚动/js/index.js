const doms = {
  scrollContainer: document.querySelector('.scroll-container'),
};

function init() {
  const pHeight = doms.scrollContainer.clientHeight;
  const pWidth = doms.scrollContainer.clientWidth;
  doms.scrollContainer.style.setProperty('--pWidth', `${pWidth}px`);
  doms.scrollContainer.style.setProperty('--pHeight', `${pHeight}px`);
}

init();

window.addEventListener('resize', function () {
  init();
});
