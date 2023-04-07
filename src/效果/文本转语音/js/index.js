const doms = {
  container: document.querySelector('.container'),
  textarea: document.querySelector('textarea'),
  button: document.querySelector('button'),
  novel: document.querySelector('.novel'),
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

/**
 * 加载大文本
 */
(async function loadNovel() {
  const url = 'https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt';
  const resp = await fetch(url);
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let remainChunk = new Uint8Array(0);
  for (;;) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const lastIndex = value.lastIndexOf(10); // 最后一个换行符的位置
    const chunk = value.slice(0, lastIndex + 1);
    const readChunk = new Uint8Array(remainChunk.length + chunk.length);
    readChunk.set(remainChunk);
    readChunk.set(chunk, remainChunk.length);
    remainChunk = value.slice(lastIndex + 1);
    const p = document.createElement('p');
    p.textContent = decoder.decode(readChunk);
    doms.novel.appendChild(p);
  }
})();
