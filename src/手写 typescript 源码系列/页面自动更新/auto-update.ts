/** 不改动服务器，自动更新页面 */
let prevScripts: string[] = [];
const scriptReg = /\<script.*src=["'](?<src>[^"'])/gm;
async function extractNewScripts() {
  const html = await fetch(`/?_timestamp=${Date.now()}`).then((resp) => resp.text());
  let result = [];
  scriptReg.lastIndex = 0;
  for (;;) {
    const match = scriptReg.exec(html);
    if (!match) {
      break;
    }
    const src = match.groups?.src;
    src && result.push(src);
  }
  return result;
}

async function needUpdate() {
  const newScripts = await extractNewScripts();
  if (!prevScripts) {
    prevScripts = newScripts;
    return false;
  }
  let result = false;
  if (prevScripts.length !== newScripts.length) {
    result = true;
  }
  for (let i = 0; i < prevScripts.length; i++) {
    if (prevScripts[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }
  prevScripts = newScripts;
  return result;
}

const DURATION = 5000;
function autoRefresh() {
  setInterval(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate) {
      const result = confirm('页面有更新，点击确定更新页面');
      if (result) {
        location.reload();
      }
    }
  }, DURATION);
}
