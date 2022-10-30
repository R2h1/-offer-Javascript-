function RadioGroup(container, items, value) {
  this.items = items;
  this.value = value;
  this.html = html;
  this.val = val;
  this.index = index;
  this.el = null; //TODO: 创建组件根节点
  if (!this.el) return;

  this.el.className = 'radio-group';
  this.el.innerHTML = this.html();
  container.appendChild(this.el);

  this.el.addEventListener('click', (event) => {
    var el = event.target;
    if (el.tagName !== 'LABEL') return;
    var index = 0; //TODO: 获取当前点击项的序号

    this.val(this.items[index].value);
  });

  function html() {
    //TODO: 生成组件的内部html字符串
    return '';
  }

  function val(value) {
    if (arguments.length === 0) return this.value;
    if (value === this.value) return;

    // TODO:
    // 1、判断设定的值是否存在选项
    // 2、判断选项是否disabled
    // 3、切换选中的class

    // 更新值
    this.value = value;
  }

  function index(value) {
    for (var i = 0, l = this.items.length; i < l; i++) {
      if (items[i].value === value) return i;
    }
    return -1;
  }
}
