const items = document.querySelectorAll('.carousel-item');
let index = 2; // 当前显示的是第几张

function layout() {
  const xOffsetStep = 150; // 每张轮播图之间的间隔
  const scaleStep = 0.6;
  const opacityStep = 0.5;
  const count = items.length;
  for (let i = 0; i < count; i++) {
    const item = items[i];
    const sign = Math.sign(i - index);
    let xOffset = (i - index) * xOffsetStep;
    if (i !== index) {
      xOffset += 100 * sign;
    }
    const scale = scaleStep ** Math.abs(i - index);
    const rotateY = i === index ? 0 : 30 * -sign;
    const opacity = opacityStep ** Math.abs(i - index);
    item.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
    item.style.zIndex = count - Math.abs(index - i);
    item.style.opacity = opacity;
  }
}

layout();

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => {
  index = index - 1;
  if (index < 0) {
    index = items.length - 1;
  }
  layout();
});
next.addEventListener('click', () => {
  index = index + 1;
  if (index > items.length - 1) {
    index = 0;
  }
  layout();
});

items.forEach((item, i) => {
  item.addEventListener('click', () => {
    index = i;
    layout();
  });
});
