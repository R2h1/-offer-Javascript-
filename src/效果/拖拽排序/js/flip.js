/**
 * 实现 flip 动画
 */
class Flip {
  constructor(elements, duration = 300) {
    this.elements = Array.from(elements);
    this.duration = duration;
    // 1. first 记录初始状态
    this.prevPositions = this._getRects();
  }

  _getRects() {
    return this.elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return rect;
    });
  }

  play() {
    // 2. last 记录结束状态
    this.currentPositions = this._getRects();

    // 3. invert 反转元素到初始状态
    this.elements.forEach((element, index) => {
      const currentPosition = this.currentPositions[index];
      const prevPosition = this.prevPositions[index];

      // 计算起始状态与结束状态的变化量
      const offsets = {
        x: prevPosition.left - currentPosition.left,
        y: prevPosition.top - currentPosition.top
      };

      // 起始状态与结束状态无变化（默认是位置上）
      if (offsets.x === 0 && offsets.y === 0) {
        return;
      }

      const keyframes = [
        {
          transform: `translate(${offsets.x}px, ${offsets.y}px)`
        },
        { transform: 'translate(0)' }
      ];

      const options = {
        duration: this.duration,
        easing: 'cubic-bezier(0, 0, 0.32, 1)'
      };

      // 4. play 播放动画回到结束状态
      element.animate(keyframes, options);
    });
  }
}
