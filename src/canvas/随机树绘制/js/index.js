const canvas = document.querySelector('.canvas');
const btn = document.querySelector('.refresh');
const ctx = canvas.getContext('2d');

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBranch([canvas.width / 2, canvas.height], 20, 150, 90);
}

init();

btn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
});

window.addEventListener('resize', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
});

function drawBranch(v0, thick, length, direction) {
  if (thick < 10 && Math.random() < 0.2) {
    return;
  }
  if (thick < 2) {
    ctx.beginPath();
    ctx.arc(...v0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = Math.random() < 0.5 ? '#fff' : '#f40';
    ctx.fill();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(...v0);
  const v1 = [
    v0[0] - length * Math.cos((direction * Math.PI) / 180),
    v0[1] - length * Math.sin((direction * Math.PI) / 180)
  ];
  ctx.lineTo(...v1);
  ctx.strokeStyle = '#642';
  ctx.lineCap = 'round';
  ctx.lineWidth = thick;
  canvas.style.background = '#adf';
  ctx.stroke();
  // 递归得绘制左分支和右分支
  drawBranch(v1, thick * 0.8, length * 0.8, direction + Math.random() * 30);
  drawBranch(v1, thick * 0.8, length * 0.8, direction - Math.random() * 30);
}
