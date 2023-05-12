class Block {
  constructor(options) {
    // 宽高
    this.size = options.size;
    // 坐标
    this.axis = options.axis;
    // 速度
    this.speed = options.speed;
    // 对应的元素
    this.element = options.element;
  }
  get width() {
    return this.size.width;
  }
  get height() {
    return this.size.height;
  }

  get xAxis() {
    return this.axis.left;
  }
  set xAxis(val) {
    this.axis.left = val;
  }
  get yAxis() {
    return this.axis.top;
  }
  set yAxis(val) {
    this.axis.top = val;
  }

  // 速度（单位：px/s）
  get xSpeed() {
    return this.speed.x;
  }
  get ySpeed() {
    return this.speed.y;
  }

  /**
   * 移动
   * @param {number} duration
   */
  move(duration) {
    const xDis = this.xSpeed * duration;
    const yDis = this.ySpeed * duration;
    this.xAxis = this.xAxis + xDis;
    this.yAxis = this.yAxis + yDis;

    // 渲染前需要调用的方法
    if (this.onMove) {
      this.onMove();
    }

    this.render();
  }

  render() {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.left = this.xAxis + 'px';
    this.element.style.top = this.yAxis + 'px';
  }
}

const skyDom = document.querySelector('.sky');
const skyStyles = window.getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Block {
  constructor() {
    super({
      size: {
        width: skyWidth,
        height: skyHeight,
      },
      axis: {
        left: 0,
        top: 0,
      },
      speed: {
        x: -100,
        y: 0,
      },
      element: skyDom,
    });
  }

  onMove() {
    if (this.xAxis <= -skyHeight / 2) {
      this.xAxis = 0;
    }
  }
}

const sky = new Sky();

setInterval(() => {
  sky.move(50 / 1000);
}, 50);
