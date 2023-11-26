// Generator + yield 深度优先遍历 DOM 树
function* traverse(elements: Element[]): any {
  for (const element of elements) {
    yield element;
    const children = Array.from(element.children);
    if (children.length === 0) {
      yield* traverse(children);
    }
  }
}
