/**
 * 解析歌词, 返回一个歌词对象数组
 * 歌词对象：{ time: 开始时间, words: 歌词内容}
 * @param { String } lrcStr
 * @returns { Array }
 */
function parseLrc(lrcStr) {
  return lrcStr.split('\n').reduce((acc, item, index) => {
    const [timeStr, words] = item.substring(1).split(']');
    acc.push({
      time: parseTime(timeStr),
      words,
    });
    return acc;
  }, []);
}

/**
 * 将时间字符串转换为数字时间
 * @param { String } timeStr
 * @returns
 */
function parseTime(timeStr) {
  const parts = timeStr.split(':');
  return Number(parts[0]) * 60 + Number(parts[1]);
}

/**
 * 当前播放时间对应的歌词
 * 初始如果没有任何歌词显示则得到 -1, 如果是最后一句歌词，则返回
 * @param lrcData 歌词对象数组
 */
function findIndexOfLrc(lrcData, audio) {
  const curTime = audio.currentTime;
  const len = lrcData.length;
  for (let i = 0; i < len; i++) {
    if (lrcData[i].time > curTime) {
      return i - 1;
    }
  }
  return len - 1;
}

/**
 * 创建所有歌词 li 并放到 歌词列表 ul 内
 * @param lrcData
 */
function createLrcElements(lrcData, ul) {
  const lrcLis = lrcData.reduce((acc, item) => {
    const lrcElement = document.createElement('li');
    lrcElement.textContent = item.words;
    acc.appendChild(lrcElement);
    return acc;
  }, document.createDocumentFragment());
  ul.appendChild(lrcLis);
}

/**
 * 设置歌词列表 ul 的偏移量
 * @param {*} ul
 * @param {*} liHeight
 * @param {*} maxOffset
 * @returns
 */
function setOffset(lrcData, doms, options) {
  const { audio, ul } = doms;
  // 当前正 active 的 li
  const preActiveLi = ul.querySelector('.active');
  const nextIndex = findIndexOfLrc(lrcData, audio);
  // 当前应 active 的 li
  const curActiveLi = ul.children[nextIndex];
  if (!curActiveLi || curActiveLi === preActiveLi) {
    return;
  }
  const { containerHeight, maxOffset, liHeight } = options;
  let offset = nextIndex * liHeight - containerHeight / 2;
  if (offset < 0) {
    offset = 0;
  } else if (offset > maxOffset) {
    offset = maxOffset;
  }
  ul.style.transform = `translateY(${-offset}px)`;
  if (preActiveLi) {
    preActiveLi.classList.remove('active');
  }
  curActiveLi.classList.add('active');
}

function init() {
  const doms = {
    audio: document.querySelector('audio'),
    container: document.querySelector('.container'),
    ul: document.querySelector('.lrc-list'),
  };

  const lrcData = parseLrc(lrc);
  createLrcElements(lrcData, doms.ul);

  const containerHeight = doms.container.clientHeight;
  const options = {
    // 容器高度
    containerHeight,
    // li高度
    liHeight: doms.ul.children[0].clientHeight,
    // // 最大偏移
    // maxOffset: doms.ul.clientHeight - containerHeight
  };
  doms.audio.addEventListener('timeupdate', () => {
    setOffset(lrcData, doms, options);
  });
}

init();
