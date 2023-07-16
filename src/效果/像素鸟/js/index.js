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
    if (this.xAxis <= -skyWidth / 2) {
      // 天空移动距离大于游戏界面宽度，进行重置
      this.xAxis = 0;
    }
  }
}

const birdDom = document.querySelector('.bird');
const birdStyles = window.getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
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
  }

  /**
   * 水管是否移出区域
   */
  get isMoveOut() {
    return this.xAxis < -this.size.width;
  }

  onMove() {
    if (this.isMoveOut) {
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

/**
 * 生成水管对
 */
class PipePairProducer {
  constructor(speed, tick) {
    this.pipePairs = [];
    this.timer = null;
    this.speed = speed; // 移动速度
    this.tick = tick; // 产生间隔
  }

  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pipePairs.push(new PipePair(this.speed));
      this.pipePairs.splice(
        0,
        this.pipePairs.findIndex((pipePair) => !pipePair.upPipe.isMoveOut)
      );
    }, this.tick);
  }

  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

class Game {
  constructor() {
    this.sky = new Sky();
    this.bird = new Bird();
    this.pipeProducer = new PipePairProducer(-100, 1500);
    this.timer = null;
    this.tick = 20;
    this.gameOver = false;
  }

  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload();
    }
    const duration = this.tick / 1000;
    this.pipeProducer.startProduce();
    this.bird.startSwing();
    this.timer = setInterval(() => {
      this.sky.move(duration);
      this.bird.move(duration);
      this.pipeProducer.pipePairs.forEach((pipePair) => {
        pipePair.move(duration);
      });
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
      }
    }, this.tick);
  }

  isGameOver() {
    if (this.bird.yAxis === this.bird.maxYAxis) {
      return true;
    }

    for (let i = 0; i < this.pipeProducer.pipePairs.length; i++) {
      const pipePair = this.pipeProducer.pipePairs[i];
      if (this.isHit(this.bird, pipePair.upPipe) || this.isHit(this.bird, pipePair.downPipe)) {
        return true;
      }
    }
    return false;
  }

  isHit(rect1, rect2) {
    const centerX1 = rect1.xAxis + rect1.width / 2;
    const centerY1 = rect1.yAxis + rect1.height / 2;
    const centerX2 = rect2.xAxis + rect2.width / 2;
    const centerY2 = rect2.yAxis + rect2.height / 2;
    const disX = Math.abs(centerX1 - centerX2);
    const disY = Math.abs(centerY1 - centerY2);
    console.log(rect1, rect2);
    if (disX < (rect1.width + rect2.width) / 2 && disY < (rect1.height + rect2.height) / 2) {
      return true;
    }
    return false;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.pipeProducer.stopProduce();
    this.bird.stopSwing();
  }

  registerEvent() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === ' ') {
        this.bird.jump();
      }
    });
  }
}

const game = new Game();
game.registerEvent();
