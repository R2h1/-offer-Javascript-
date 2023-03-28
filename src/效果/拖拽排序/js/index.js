const doms = {
  container: document.querySelector('.container'),
};

let draggingItem;

doms.container.addEventListener('dragstart', function (e) {
  window.requestAnimationFrame(() => {
    e.target.classList.add('dragging');
  });
  draggingItem = e.target;
  e.dataTransfer.effectAllowed = 'move';
});

doms.container.addEventListener('dragover', function (e) {
  e.preventDefault();
});

doms.container.addEventListener('dragenter', function (e) {
  e.preventDefault();
  const { container } = doms;
  const { target } = e;
  // 排除父元素与自身
  if (target === container || target === draggingItem) {
    return;
  }
  const items = Array.from(container.children);
  // 拖拽进入的元素的下标
  const dragenterIndex = items.indexOf(target);
  // 拖拽元素的下标
  const draggingIndex = items.indexOf(draggingItem);
  if (dragenterIndex > draggingIndex) {
    // 向下拖拽
    container.insertBefore(draggingItem, target.nextElementSibling);
  } else {
    // 向上拖拽
    container.insertBefore(draggingItem, target);
  }
});

doms.container.addEventListener('dragend', function (e) {
  e.target.classList.remove('dragging');
});
