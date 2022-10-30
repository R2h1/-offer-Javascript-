/**
 * Element virtual-dom 对象构造函数
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Array<Element|String>} - 子节点
 */

function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  // dom 元素的key 值,用作唯一标识符
  if (props.key) this.key = props.key;
  //子元素个数
  let count = 0;
  children.forEach((child, index) => {
    if (child instanceof Element) {
      count += child.count;
    } else {
      children[index] = '' + child;
    }
    //因为children为引用数据类型，this.children随children改变
    count++;
  });
  this.count = count;
}

function creatElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

module.exports = creatElement;
