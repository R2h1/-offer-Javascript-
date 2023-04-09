const PARTICLE_NUM = 1500;
const FONT_SIZE = 100;
const COLOR = '#5445544d';
const SIZE = [2, 7];

const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d', {
  willReadFrequently: true,
});

let clockText = '';
let startMoveTime = 0;
const particles = new Array(PARTICLE_NUM);

/**
 * 获取 [min, max] 范围内的随机整数
 * @param {number} min 随机数的最小值
 * @param {number} max 随机数的最大值
 * @returns {number} 随机数
 * @example
 * getRandom(0, 10);获取[0, 10]之间的随机整数
 */
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getText() {
  return new Date().toTimeString().substring(0, 8);
}

class Particle {
  constructor(prevCoordinate, curCoordinate = { ...prevCoordinate }, r = getRandom(SIZE[0], SIZE[1]), color = COLOR) {
    this.prevCoordinate = prevCoordinate;
    this.curCoordinate = curCoordinate;
    this.r = r;
    this.color = color;
  }
  draw() {
    const { x, y } = this.curCoordinate;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  cvs.width = window.innerWidth / 4;
  cvs.height = window.innerHeight / 4;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    // 粒子出现在圆周上的弧度
    const radian = Math.random() * 2 * Math.PI;
    // 圆周半径
    const r = cvs.height / 2;
    particles[i] = new Particle({
      x: cvs.width / 2 + Math.cos(radian) * r,
      y: cvs.height / 2 - Math.sin(radian) * r,
    });
    particles[i].draw();
  }
  fps();
}

function drawText(text) {
  const { width, height } = cvs;
  clear();
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  ctx.font = `${FONT_SIZE}px '手札体-筒', sans-serif`;
  const textWidth = ctx.measureText(text).width;
  ctx.fillText(text, (width - textWidth) / 2, height / 2);
  return ctx.getImageData(0, 0, width, height);
}

function update(textPixelData) {
  clear();
  const { width, height, data } = textPixelData;
  const dis = 4;
  const targets = [];
  for (let w = 0; w < width; w += dis) {
    for (let h = 0; h < height; h += dis) {
      const i = (w + h * width) * 4;
      if (data[i] > 10) {
        targets.push({ x: w, y: h });
      }
    }
  }
  const count = Math.min(particles.length, targets.length);
  const duration = 400;
  const timeSpan = Date.now() - startMoveTime;
  for (let i = 0; i < count; i++) {
    const particle = particles[i];
    const { x: prevX, y: prevY } = particle.prevCoordinate;
    const { x: curX, y: curY } = targets[i];
    const disX = curX - prevX;
    const disY = curY - prevY;
    let moveX = (disX / duration) * timeSpan;
    let moveY = (disY / duration) * timeSpan;
    if (Math.abs(moveX) > Math.abs(disX)) {
      moveX = disX;
    }
    if (Math.abs(moveY) > Math.abs(disY)) {
      moveY = disY;
    }
    particle.curCoordinate = {
      x: prevX + moveX,
      y: prevY + moveY,
    };
    particle.draw();
  }
}

function fps() {
  window.requestAnimationFrame(() => {
    const curText = getText();
    if (curText !== clockText) {
      clockText = curText;
      for (const particle of particles) {
        particle.prevCoordinate = {
          ...particle.curCoordinate,
        };
      }
      startMoveTime = Date.now();
    }
    const textPixelData = drawText(clockText);
    update(textPixelData);
    fps();
  });
}

function clear() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
}

init();
