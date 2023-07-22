const imgs = ['./assets/1.jpg', './assets/2.jpg', './assets/3.jpg', './assets/4.jpg', './assets/5.jpg'];

const scrollContent = document.querySelector('.scroll-content');

let currentIndex = 0;
function getIndexMap() {
  const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1;
  return {
    prev: prevIndex,
    cur: currentIndex,
    next: nextIndex
  };
}

function createItems(indexes) {
  const scrollItems = indexes.reduce((acc, item) => {
    const [className, index] = item;
    const imgUrl = imgs[index];
    const scrollItem = document.createElement('div');
    scrollItem.classList.add('item');
    scrollItem.classList.add(className);
    scrollItem.innerHTML = `<img src="${imgUrl}" />`;
    acc.appendChild(scrollItem);
    return acc;
  }, document.createDocumentFragment());
  scrollContent.appendChild(scrollItems);
}

function removeClasses(ele, classNames) {
  for (const className of classNames) {
    ele.classList.remove(className);
  }
}

function resetElements() {
  scrollContent.innerHTML = '';
  const indexMap = getIndexMap();
  createItems(Object.entries(indexMap));
}

resetElements();

let isAnimating = false;
scrollContent.addEventListener('wheel', (e) => {
  if (!e.deltaY) {
    return;
  }
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  const indexMap = getIndexMap();
  if (e.deltaY > 0) {
    scrollContent.classList.add('scroll-down');
    currentIndex = indexMap.next;
  } else {
    scrollContent.classList.add('scroll-up');
    currentIndex = indexMap.prev;
  }
});

scrollContent.addEventListener('transitionend', (e) => {
  isAnimating = false;
  removeClasses(scrollContent, ['scroll-down', 'scroll-up']);
  resetElements();
});
