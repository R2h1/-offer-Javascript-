const doms = {
  container: document.querySelector('.container'),
  textarea: document.querySelector('textarea'),
  button: document.querySelector('button'),
};

let text = '';
function startTTS(msg) {
  msg.volume = 2;
  msg.rate = 0.8;
  window.speechSynthesis.speak(msg);
}

doms.container.addEventListener('input', function (e) {
  const textarea = e.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
  text = e.target.value;
});

doms.button.addEventListener('click', function (e) {
  if (text) {
    const msg = new SpeechSynthesisUtterance(text);
    startTTS(msg);
  }
});
