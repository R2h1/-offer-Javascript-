const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');

function init() {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
}

init();

/**
 * 获取 [min, max] 范围内的随机整数
 * @param {*} min
 * @param {*} max
 * @returns
 */
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * 计算两点之间的距离
 * @param {*} point1
 * @param {*} point2
 * @returns
 */
function getDistance(point1, point2) {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

class Point {
  constructor() {
    this.r = 3;
    this.x = getRandom(0, this.maxX);
    this.y = getRandom(0, this.maxY);
    // 点运动的速度
    this.speed = {
      x: getRandom(-50, 50),
      y: getRandom(-50, 50),
    };
    // 点运动的时间
    this.lastDrawTime = null;
  }

  get maxX() {
    return cvs.width - this.r;
  }

  get maxY() {
    return cvs.height - this.r;
  }
  draw() {
    if (this.lastDrawTime) {
      // 更新坐标
      const duration = (Date.now() - this.lastDrawTime) / 1000;

      let x = this.x + this.speed.x * duration;
      let y = this.y + this.speed.y * duration;
      if (x > this.maxX) {
        x = this.maxX;
        this.speed.x = -this.speed.x;
      } else if (x < 0) {
        x = 0;
        this.speed.x = -this.speed.x;
      }
      if (y > this.maxY) {
        y = this.maxY;
        this.speed.y = -this.speed.y;
      } else if (y < 0) {
        y = 0;
        this.speed.y = -this.speed.y;
      }
      this.x = x;
      this.y = y;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fill();
    this.lastDrawTime = Date.now();
  }
}

class Graph {
  constructor(pointCount = 50, maxDistance = 200) {
    this.maxDistance = maxDistance;
    this.pointCount = pointCount;
    this.points = new Array(pointCount).fill(0).map(() => new Point());
  }

  draw() {
    window.requestAnimationFrame(() => {
      this.draw();
    });
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < this.pointCount; i++) {
      const pointI = this.points[i];
      pointI.draw();
      for (let j = i + 1; j < this.pointCount; j++) {
        const pointJ = this.points[j];
        const distance = getDistance(pointI, pointJ);
        if (distance > this.maxDistance) {
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(pointI.x, pointI.y);
        ctx.lineTo(pointJ.x, pointJ.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / this.maxDistance})`;
        ctx.stroke();
      }
    }
  }
}

new Graph().draw();
