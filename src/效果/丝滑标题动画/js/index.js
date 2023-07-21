document.querySelectorAll('.title').forEach((title) => {
  title.innerHTML = title.textContent
    .split('')
    .map((letter) => `<span class="letter">${letter.trim() ? letter : '&nbsp;'}</span>`)
    .join('');
});

const letters = document.querySelectorAll('.letter');
for (let i = 0; i < letters.length; i++) {
  letters[i].style.setProperty('--delay', `${i * 0.05}s`);
}
