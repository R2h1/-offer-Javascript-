import { computed } from 'vue';

/**
 * 图片清晰度（包括 canvas)
 * 保证：原始尺寸(cvs.width/cvs.height) = 样式尺寸 * 缩放倍率（window.devicePixelRatio)
 */
export default function useWatermarkBg(props: { fontSize: number; gap: number; text: string }) {
  return computed(() => {
    const cvs = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    const fontSize = props.fontSize * dpr;
    const font = fontSize + 'px serif';
    const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = font;
    const { width } = ctx.measureText(props.text);
    const cvsSize = Math.max(100, width) + props.gap * dpr;
    cvs.width = cvsSize;
    cvs.height = cvsSize;
    ctx.translate(cvs.width / 2, cvs.height / 2);
    ctx.rotate((Math.PI / 180) * -45);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(props.text, 0, 0);
    return {
      base64: cvs.toDataURL(),
      size: cvsSize,
      styleSize: cvsSize / dpr,
    };
  });
}
