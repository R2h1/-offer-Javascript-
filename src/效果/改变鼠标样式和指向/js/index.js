const pointer = document.querySelector('.pointer');
pointer.style.opacity = 0;
window.addEventListener('mousemove', (e) => {
  const rad = Math.abs(e.movementX) + Math.abs(e.movementY) > 3 ? Math.atan2(e.movementX, -e.movementY) : 0;
  pointer.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(${rad}rad)`;
});

window.addEventListener('mouseout', (e) => {
  pointer.style.opacity = 0;
});
window.addEventListener('mouseover', (e) => {
  pointer.style.opacity = 1;
});
