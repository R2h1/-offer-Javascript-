const colorPicker = document.querySelector('input[type="color"]');
const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');

function init() {
  const w = 500;
  const h = 300;
  // 原始尺寸
  cvs.width = w * devicePixelRatio;
  cvs.height = h * devicePixelRatio;
  // 样式尺寸
  cvs.style.width = w + 'px';
  cvs.style.height = h + 'px';
}

init();

let needDraw = false;

const shapes = [];

class Rectangle {
  constructor(color, startPoint, endPoint = startPoint) {
    this.color = color;
    this.startPoint = startPoint;
    this.endPoint = startPoint;
  }

  /**
   * 获取起始点和结束点 x或y坐标的极值
   * 默认取 x 坐标的极小值
   * @param {*} param0
   * @returns
   */
  getExtremeAxis({ type = 'min', axis = 'x' } = {}) {
    if (!['min', 'max'].includes(type)) {
      throw new TypeError(`params type only be min or max, but you give a "${type}"`);
    }
    if (!['x', 'y'].includes(axis)) {
      throw new TypeError(`params axis only be min or max, but you give a "${axis}"`);
    }
    return Math[type](this.startPoint[axis], this.endPoint[axis]);
  }

  getIsInternalPoint(point) {
    const { x, y } = point;
    const [minX, minY, maxX, maxY] = [
      this.getExtremeAxis(),
      this.getExtremeAxis({ axis: 'y' }),
      this.getExtremeAxis({ type: 'max' }),
      this.getExtremeAxis({ type: 'max', axis: 'y' }),
    ];
    return x > minX && x <= maxX && y >= minY && y <= maxY;
  }

  draw(ctx) {
    ctx.beginPath();
    const [minXDpr, minYDpr, maxXDpr, maxYDpr] = [
      this.getExtremeAxis() * devicePixelRatio,
      this.getExtremeAxis({ axis: 'y' }) * devicePixelRatio,
      this.getExtremeAxis({ type: 'max' }) * devicePixelRatio,
      this.getExtremeAxis({ type: 'max', axis: 'y' }) * devicePixelRatio,
    ];
    ctx.moveTo(minXDpr, minYDpr);
    ctx.lineTo(maxXDpr, minYDpr);
    ctx.lineTo(maxXDpr, maxYDpr);
    ctx.lineTo(minXDpr, maxYDpr);
    ctx.lineTo(minXDpr, minYDpr);
    ctx.fillStyle = this.color;
    ctx.fill();
    (ctx.strokeStyle = '#ffffff'), (ctx.lineWidth = 3 * devicePixelRatio);
    ctx.lineCap = 'square';
    ctx.stroke();
  }
}

cvs.addEventListener('mousedown', function (e) {
  needDraw = true;
  const { left, top } = cvs.getBoundingClientRect();
  const clickPoint = {
    x: e.clientX - left,
    y: e.clientY - top,
  };
  const shape = getShape(clickPoint);
  if (shape) {
    // 拖拽
    const {
      startPoint: { x: startX, y: startY },
      endPoint: { x: endX, y: endY },
    } = shape;
    const handleMousemove = (e) => {
      // 鼠标移动的距离
      const disX = e.clientX - left - clickPoint.x;
      const disY = e.clientY - top - clickPoint.y;
      // 更新拖拽图形的坐标
      shape.startPoint.x = startX + disX;
      shape.startPoint.y = startY + disY;
      shape.endPoint.x = endX + disX;
      shape.endPoint.y = endY + disY;
    };
    const handleMouseup = () => {
      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('mouseup', handleMouseup);
      needDraw = false;
    };
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  } else {
    // 新建
    const newShape = new Rectangle(colorPicker.value, clickPoint);
    shapes.push(newShape);
    const handleMousemove = (e) => {
      newShape.endPoint = {
        x: e.clientX - left,
        y: e.clientY - top,
      };
    };
    const handleMouseup = () => {
      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('mouseup', handleMouseup);
      needDraw = false;
    };
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  }
});

function getShape(point) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.getIsInternalPoint(point)) {
      return shape;
    }
  }
  return null;
}

function draw() {
  window.requestAnimationFrame(draw);
  if (!needDraw) return;
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (const shape of shapes) {
    shape.draw(ctx);
  }
}

draw();

window.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key === 'z') {
    shapes.length && shapes.pop();
    needDraw = true;
    window.requestAnimationFrame(() => {
      needDraw = false;
    });
  }
});
