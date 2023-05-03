import config from './config';

/**
 * 清空控制台，读取config.js中的text配置，打印开始位置到index位置
 * @param {number} index
 */
export default function print(index: number) {
  console.clear();
  const txt = config.text.substring(0, index + 1);
  console.log(txt);
}
