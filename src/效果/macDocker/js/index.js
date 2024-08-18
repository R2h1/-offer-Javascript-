const docker = document.querySelector('.docker');
const items = document.querySelector('.menu').children;
const range = 300;
const maxScale = 1.8;
const layout = (curve) => {
  for (const item of items) {
    const rect = item.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const scale = curve(x);
    item.style.setProperty('--i', scale);
  }
};
const baseCure = (x) => {
  if (x < 0) return 0;
  if (x > 1) return 0;
  return Math.sin(x * Math.PI);
};

const createCure = (totalXDis, topX, minY, maxY) => {
  return function curve(x) {
    const beginX = topX - totalXDis / 2;
    const endX = topX + totalXDis / 2;
    if (x < beginX) return minY;
    if (x > endX) return minY;
    const yDis = maxY - minY;
    return baseCure((x - beginX) / totalXDis) * yDis + minY;
  };
};
docker.onmousemove = (e) => {
  const curve = createCure(range, e.clientX, 1, maxScale);
  layout(curve);
};
docker.onmouseleave = () => {
  layout(() => 1);
};
