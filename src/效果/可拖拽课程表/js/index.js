const container = document.querySelector('.container');
// 拖拽的哪个元素
let sourceNode;
container.ondragstart = function (e) {
  // 默认是copy,通过dataset设置默认效果
  e.dataTransfer.effectAllowed = e.target.dataset.effect;
  sourceNode = e.target;
};
// 经过哪个元素
container.ondragover = function (e) {
  e.preventDefault();
};

// 清除元素的背景颜色
function clearDropStyle() {
  document.querySelectorAll('.drop-over').forEach((node) => {
    node.classList.remove('drop-over');
  });
}

function getDropNode(node) {
  while (node) {
    if (node.dataset && node.dataset.drop) {
      return node;
    }
    // 否则向上查找
    node = node.parentNode;
  }
}

// 放在哪个元素上方
container.ondragenter = function (e) {
  // 需要清除之前的drop-over
  clearDropStyle();
  // 添加背景颜色，需要判断dataset属性为copy并且是不是等于拖拽元素的e.dataTransfer.effectAllowed
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    dropNode.classList.add('drop-over');
  }
};
// 松手  浏览器有默认行为,阻止拖放
container.ondrop = function (e) {
  // 需要清除之前的drop-over
  clearDropStyle();
  const dropNode = getDropNode(e.target);
  // 目标节点是copy
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    if (dropNode.dataset.drop === 'copy') {
      // 避免多次添加
      dropNode.innerHTML = '';
      const cloneNode = sourceNode.cloneNode(true);
      cloneNode.dataset.effect = 'move';
      dropNode.appendChild(cloneNode);
    } else if (dropNode.dataset.drop === 'move') {
      // 删除拖拽节点
      sourceNode.remove();
    }
  }
};
