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
  set ySpeed(val) {
    this.speed.y = val;
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
        height: skyHeight
      },
      axis: {
        left: 0,
        top: 0
      },
      speed: {
        x: -100,
        y: 0
      },
      element: skyDom
    });
  }

  onMove() {
    if (this.xAxis <= -skyHeight / 2) {
      this.xAxis = 0;
    }
  }
}

const birdDom = document.querySelector('.bird');
const birdStyles = window.getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.Left);
const birdTop = parseFloat(birdStyles.top);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;
const gameWidth = gameDom.clientWidth;

class Bird extends Block {
  constructor() {
    super({
      size: {
        width: birdWidth,
        height: birdHeight
      },
      axis: {
        left: birdLeft,
        top: birdTop
      },
      speed: {
        x: 0,
        y: 0
      },
      element: birdDom
    });
    this.g = 1500; // 小鸟向下的加速度，单位：px/s^2;
    this.maxYAxis = gameHeight - this.size.height;
    this.swingStatus = 1;
    this.timer = null;
    this.startSwing();
  }

  render() {
    super.render();
    this.element.className = `bird swing${this.swingStatus}`;
  }

  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swingStatus = this.swingStatus + 1;
      if (this.swingStatus > 3) {
        this.swingStatus = 1;
      }
      this.render();
    }, 200);
  }

  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  move(duration) {
    super.move(duration);
    this.ySpeed = this.ySpeed + this.g * duration;
  }

  onMove() {
    if (this.yAxis < 0) {
      this.yAxis = 0;
    } else if (this.yAxis > this.maxYAxis) {
      this.yAxis = this.maxYAxis;
    }
  }
  jump() {
    this.ySpeed = -300;
  }
}

class Pipe extends Block {
  constructor(height, yAxis, xSpeed, element) {
    super({
      size: {
        width: 52,
        height
      },
      axis: {
        left: gameWidth,
        top: yAxis
      },
      speed: {
        x: xSpeed,
        y: 0
      },
      element
    });
    this.render();
    this.timer = null;
    this.startMove();
  }

  startMove() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.move(20 / 1000);
    }, 20);
  }

  stopMove() {
    clearInterval(this.timer);
    this.timer = null;
  }

  onMove() {
    if (this.xAxis < -this.size.width) {
      this.stopMove();
      this.element.remove();
    }
  }
}

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

class PipePair {
  constructor(xSpeed) {
    this.gap = 150; // 空隙高度;
    this.minHeight = 80;
    this.maxHeight = gameHeight - this.gap - this.minHeight;
    const downHeight = getRandom(this.minHeight, this.maxHeight);
    const upHeight = gameHeight - this.gap - downHeight;
    const upYAxis = gameHeight - downHeight;

    const downPipeDom = document.createElement('div');
    downPipeDom.className = 'pipe down';
    const upPipeDom = document.createElement('div');
    upPipeDom.className = 'pipe up';
    gameDom.appendChild(downPipeDom);
    gameDom.appendChild(upPipeDom);

    // 向上的水管
    this.upPipe = new Pipe(downHeight, upYAxis, xSpeed, upPipeDom);
    // 向下的水管
    this.downPipe = new Pipe(upHeight, 0, xSpeed, downPipeDom);
  }

  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

const sky = new Sky();
const bird = new Bird();

setInterval(() => {
  sky.move(20 / 1000);
  bird.move(20 / 1000);
}, 20);

setInterval(() => {
  new PipePair(-50);
}, 4000);

gameDom.addEventListener('click', function () {
  bird.jump();
});
