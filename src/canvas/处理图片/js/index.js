const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d', {
  willReadFrequently: true
});

function loadImage(path) {
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(`load image error: ${path}`);
    };
    img.src = path;
  });
}

async function init() {
  try {
    const img = await loadImage('./assets/eg.jpg');
    /**
     * 图片清晰度（包括 canvas)
     * 保证：原始尺寸(cvs.width/cvs.height) = 样式尺寸 * 缩放倍率（window.devicePixelRatio)
     */
    cvs.width = img.width;
    cvs.height = img.height;
    ctx.drawImage(img, 0, 0);
  } catch (err) {
    console.error(err);
  }
}

init();

function point2Index({ x, y }) {
  return (y * cvs.width + x) * 4;
}

function getPixelColor(imgPixelData, point) {
  const index = point2Index(point);
  return [imgPixelData[index], imgPixelData[index + 1], imgPixelData[index + 2], imgPixelData[index + 3]];
}

function getIsSimilar(color1, color2, distance) {
  const diff = color1.reduce((acc, item, index) => {
    acc = acc + Math.abs(item - color2[index]);
    return acc;
  }, 0);
  return diff <= distance;
}

function changeColor(imagPixelData, point, clickPointPixelColor, targetColor, distance = 100) {
  const { x, y } = point;
  if (x < 0 || x >= cvs.width || y < 0 || y >= cvs.height) {
    return;
  }
  const pointColor = getPixelColor(imagPixelData, point); // 当前坐标的颜色
  // 当前坐标的颜色和点击坐标的颜色不相近
  if (!getIsSimilar(pointColor, clickPointPixelColor, distance)) {
    return;
  }
  // 当前坐标的颜色和目标颜色相同
  if (getIsSimilar(pointColor, targetColor, 0)) {
    return;
  }
  const index = point2Index(point);
  imagPixelData.set(targetColor, index);
  //todo 优化，不用递归，用栈
  changeColor(imagPixelData, { x: x + 1, y }, clickPointPixelColor, targetColor, distance);
  changeColor(imagPixelData, { x: x - 1, y }, clickPointPixelColor, targetColor, distance);
  changeColor(imagPixelData, { x, y: y + 1 }, clickPointPixelColor, targetColor, distance);
  changeColor(imagPixelData, { x, y: y - 1 }, clickPointPixelColor, targetColor, distance);
}

cvs.addEventListener('click', function (e) {
  const point = {
    x: e.offsetX,
    y: e.offsetY
  };
  const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
  const { data: imgPixelData } = imgData;
  const clickPointPixelColor = getPixelColor(imgPixelData, point);

  const targetColor = [0, 255, 0, 255];
  try {
    const distance = 100;
    changeColor(imgPixelData, point, clickPointPixelColor, targetColor);
  } catch (err) {
    alert('递归过多');
    return;
  }
  ctx.putImageData(imgData, 0, 0);
});
