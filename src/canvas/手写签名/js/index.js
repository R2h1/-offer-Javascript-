const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  const { left, top } = canvas.getBoundingClientRect();
  ctx.moveTo(e.pageX - left, e.pageY - top);
});
canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const { left, top } = canvas.getBoundingClientRect();
    ctx.lineTo(e.pageX - left, e.pageY - top);
    ctx.stroke();
  }
});
canvas.addEventListener('mouseup', (e) => {
  isDrawing = false;
});
canvas.addEventListener('mouseleave', (e) => {
  isDrawing = false;
});
