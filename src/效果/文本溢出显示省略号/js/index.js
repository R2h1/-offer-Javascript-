function init() {
  const multilineText = document.querySelector('.multiline-text-js');
  const lineCount = 5;
  const height = multilineText.clientHeight;
  const style = window.getComputedStyle(multilineText);
  const lineHeight = parseInt(style['line-height']);
  if (Math.floor(height / lineHeight) > lineCount) {
    multilineText.classList.add('after');
    multilineText.style.height = `${lineCount * lineHeight}px`;
  } else {
    multilineText.classList.remove('after');
  }
}
init();
