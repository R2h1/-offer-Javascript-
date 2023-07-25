function debounce(fn, wait = 500, leading = false, tailing = true) {
  // 计时器
  let timer = null;
  // 事件触发后实际执行的函数(监听的已经是这个函数了，所以timer是实际执行函数的外层作用域)
  // 此处不能使用箭头函数，否则 fn 的 this 和实际执行的函数不同
  return function (...args) {
    if (!timer && leading) {
      fn.apply(this, args);
    }
    // 函数被调用，清除定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 箭头函数不用保存this
    timer = setTimeout(() => {
      timer = null;
      if (tailing) {
        fn.apply(this, args);
      }
    }, wait);
  };
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

/**
 * 根据 id 随机返回当前 id 之前有多少个视频
 * @param {number} id
 * @returns
 */
function getOffset(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getRandom(0, id));
    }, 300);
  });
}

/**
 * 根据视频id生成一条视频数据
 * @param {number} id
 * @returns
 */
function createVideoData(id) {
  return {
    id,
    cover: `https://picsum.photos/seed/${id}/160/220`
  };
}

/**
 * 根据页码和页大小获取视频数据
 * @param {Number} page
 * @param {Number} pageSize
 */
function getVideos(page, pageSize) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ids = Array.from({ length: pageSize }, (_, i) => (page - 1) * pageSize + i + 1);
      resolve(ids.map(createVideoData));
    }, 500);
  });
}

/**
 * 根据页码和页大小获取页码范围
 * @param {*} page
 * @param {*} pageSize
 * @returns
 */
function getIndexRange(page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  return [start, end];
}

/**
 * 根据视频下标和页大小获取所处的页码
 * @param {number} index
 * @param {number} pageSize
 */
function getPage(index, pageSize) {
  return Math.ceil((index + 1) / pageSize);
}

const PAGE_SIZE = 12; // 每页视频数
const TOTAL_PAGE = 30; // 总页数
const currentId = 52; // 刚刚看过的视频的 id

const container = document.querySelector('.container');
const indicator = document.querySelector('.indicator');

const loadPagesDebounced = debounce(loadPages, 300); // 防抖的加载视频函数
const visibleIndexes = new Set(); // 当前能看到的视频下标集合
const iob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const index = Number(entry.target.dataset.index);
    if (entry.isIntersecting) {
      visibleIndexes.add(index);
    } else {
      visibleIndexes.delete(index);
    }
  }
  loadPagesDebounced();
});

/**
 * 获取可见的视频下标范围
 * @returns
 */
function getVisibleIndexRange() {
  if (visibleIndexes.size === 0) return [0, 0];
  const min = Math.min(...visibleIndexes);
  const max = Math.max(...visibleIndexes);
  return [min, max];
}

/**
 * 根据页码创建元素
 * @param {number} page
 */
function createElements(page) {
  const childrenLen = container.children.length;
  const count = page * PAGE_SIZE - childrenLen; // 需要创建的元素数量
  if (count <= 0) return;
  const items = new Array(count).fill(0).reduce((acc, _cur, index) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.index = index + childrenLen;
    iob.observe(item);
    acc.appendChild(item);
    return acc;
  }, document.createDocumentFragment());
  container.appendChild(items);
}

/**
 * 加载图片
 * @param {*} path
 * @returns
 */
function loadImage(path) {
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(`load image error: ${path}`);
    };
    img.src = path;
  });
}

/**
 * 加载可见范围内的页的视频数据
 */
function loadPages() {
  const [minIndex, maxIndex] = getVisibleIndexRange();
  const pages = new Set(); // 需要加载的页码集合
  for (let i = minIndex; i <= maxIndex; i++) {
    pages.add(getPage(i, PAGE_SIZE));
  }
  for (const page of pages) {
    const [minIndex, maxIndex] = getIndexRange(page, PAGE_SIZE);
    if (container.children[minIndex].dataset.loaded) {
      continue;
    }
    container.children[minIndex].dataset.loaded = true;
    getVideos(page, PAGE_SIZE).then((res) => {
      const index = +indicator.dataset.index;
      for (let i = minIndex; i <= maxIndex; i++) {
        const item = container.children[i];
        const cover = res[i - minIndex].cover;
        // 封面加载完成再添加 "播放中"
        loadImage(cover).then((imgElement) => {
          item.appendChild(imgElement);
          if (i === index) {
            item.classList.add('playing');
          }
        });
      }
    });
  }
}

/**
 * “刚刚看过”点击事件监听
 */
indicator.addEventListener('click', () => {
  const page = +indicator.dataset.page;
  const index = +indicator.dataset.index;
  createElements(page);
  container.children[index].scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  indicator.style.display = 'none';
});

/**
 * 设置“刚刚看过”按钮的可见状态
 */
async function setIndicatorVisible() {
  const offset = await getOffset(currentId);

  const [minIndex, maxIndex] = getVisibleIndexRange();
  const page = getPage(offset, PAGE_SIZE);
  if (offset >= minIndex && offset <= maxIndex) {
    indicator.style.display = 'none';
  } else {
    indicator.style.display = 'block';
  }
  indicator.dataset.page = page;
  indicator.dataset.index = offset;
}

function init() {
  createElements(TOTAL_PAGE);
  loadPages();
  setIndicatorVisible();
}

init();
