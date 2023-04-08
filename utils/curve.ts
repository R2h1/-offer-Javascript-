
interface CurvePoints {
  /* 曲线函数 */
  curveFn: Function;
  /* x坐标范围 */
  xRange: [number, number];
  /* 点的数量 */
  count: number;
  /* 显示宽度 */
  width: number;
}
/**
 * 按给定曲线获取 y 轴偏移量
 * @param param 
 */
function getCurvePoints(params: CurvePoints): number[] {
  const { curveFn, xRange, count, width } = params;
  if (count < 1) {
    return [];
  }
  if (count === 1) {
    return [0];
  }
  const result: number[] = [];
  const xDiff = xRange[1] - xRange[0];
  // 每个点 x 间距
  const interval = xDiff / (count - 1);
  // x 缩放倍数
  const xScale = width / xDiff;
  for (let i = 0; i < count; i++) {
    result.push(-curveFn(i * interval + xRange[0]) * xScale)
  }
  return result;
}

/**
 * 只支持子节点是单文本或均为元素节点
 * @param selector 
 * @param curveFn 
 * @param xRange 
 * @returns 
 */
function applyCurve(selector: string, curveFn: Function, xRange: [number, number]): void {
  const container = document.querySelector(selector) as HTMLElement;
  // 找不到容器
  if (!container) {
    return;
  }
  const { children, childNodes } = container;
  // 单文本节点
  if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
    container.innerHTML = (container.textContent as string)
      .split('')
      .map(char => `<span>${char}</span>`)
      .join('');
  }
  const count = children.length;
  const yOffsets = getCurvePoints({
    curveFn,
    xRange,
    count: count,
    width: container.clientWidth,
  });
  for (let i = 0; i < count; i++) {
    (children[i] as HTMLElement).style.transform = `translateY(${yOffsets[i]}px)`;
  }
}