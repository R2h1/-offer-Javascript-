import config from './config';
import print from './print';
import delay from './delay';
/**
 * 运行该函数，会逐字打印config.js中的文本
 * 每个字之间的间隔在config.js已有配置
 */
async function run() {
  let index = 0;
  while (index < config.text.length) {
    print(index);
    await delay(config.wordDuration);
    index = index + 1;
  }
}

run();
