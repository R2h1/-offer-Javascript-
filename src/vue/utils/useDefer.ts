// @ts-ignore
import { ref } from 'vue';

/**
 *
 * @param maxFrameCount
 */
export function useDefer(maxFrameCount = 1000) {
  // 当前渲染帧
  const frameCount = ref(0);
  // 刷新当前渲染到第几帧
  const refreshFrameCount = () => {
    window.requestAnimationFrame(() => {
      frameCount.value = frameCount.value + 1;
      if (frameCount.value < maxFrameCount) {
        refreshFrameCount();
      }
    });
  };
  refreshFrameCount();
  // 判断当前渲染至的帧数是否大于阈值 showInFrameCount, 小于则不渲染
  return function (showInFrameCount: number) {
    // @ts-ignore
    return frameCount.value >= showInFrameCount;
  };
}
