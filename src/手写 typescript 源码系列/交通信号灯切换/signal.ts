interface SignalInfo {
  name: string;
  duration: number;
}

interface SignalProps {
  init: string;
  signals: SignalInfo[];
}

type Listener = (e: Signal) => any;

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * @example
 * const signal = new Signal({
 *    init: 'red',
 *    signals: [
 *      {
 *        name: 'red',
 *        duration: 10
 *      },
 *      {
 *        name: 'yellow',
 *        duration: 3,
 *        next:
 *      },
 *      {
 *        name: 'green',
 *        duration: 5
 *      }
 * ]
 * });
 * signal.on('change', (e) => {
 *   console.log(e.sign, e.next, e.remain);
 * })
 * function handler(e) {
 *   console.log(e.sign, e.next, e.remain);
 * }
 * signal.on('tick', handler);
 * signal.off('tick', handler);
 */
class Signal {
  signals: SignalInfo[];
  sign: SignalInfo;
  start!: number;
  end!: number;
  count: number;
  events!: Map<string, Set<Listener>>;
  constructor(options: SignalProps) {
    /** 信号集合 */
    this.signals = options.signals;
    /** 信号数 */
    this.count = options.signals.length;
    /** 初始当前信号 */
    this.sign = options.signals.find((signal) => options.init === signal.name) as SignalInfo;
    this.initEvents();
    this.setSignalTime();
    this.exchange();
  }

  initEvents() {
    this.events = new Map();
    this.events.set('change', new Set());
    this.events.set('tick', new Set());
  }

  on(type: string, listener: Listener) {
    this.events.get(type)?.add(listener);
  }

  off(type: string, listener: Listener) {
    this.events.get(type)?.delete(listener);
  }

  emit(type: string) {
    this.events.get(type)?.forEach((listener) => {
      listener.call(this, this);
    });
  }

  /**
   * 下一个信号
   */
  get next() {
    return this.signals[(this.signals.indexOf(this.sign) + 1) % this.signals.length];
  }

  /**
   * 当前信号灯剩余时间
   */
  get remain() {
    const diff = this.end - Date.now();
    if (diff < 0) return 0;
    return diff / 1000;
  }

  setSignalTime() {
    this.start = Date.now();
    this.end = this.start + this.sign.duration * 1000;
  }

  async exchange() {
    await 1;
    if (this.remain > 0) {
      // 不需要切换
      await sleep(1000);
      this.emit('tick');
    } else {
      // 切换
      this.sign = this.next;
      this.setSignalTime();
      this.emit('change');
    }
    this.exchange();
  }
}
