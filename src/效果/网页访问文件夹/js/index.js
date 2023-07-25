const _ = document.querySelector.bind(document);

const doms = {
  openDirBtn: _('.open-dir-btn'),
  codeArea: _('#code-area')
};

document.addEventListener('DOMContentLoaded', function () {
  const result = hljs.highlight(code.content, {
    language: code.language
  });
  doms.codeArea.innerHTML = result.value;
  doms.codeArea.className = `hljs language-${code.language}`;
});

// hljs.highlightElement(doms.codeArea, {
//   language: 'css'
// });

// fileSystem API
doms.openDirBtn.addEventListener('click', async function (e) {
  try {
    // 1. 打开文件夹选择器
    const dirHandle = await window.showDirectoryPicker(); // 文件选择器则是 window.showOpenFilePicker();
    /**
     * 文件树形结构的根
     */
    const rootHandle = await handleDirHandle(dirHandle);
    if (!rootHandle) {
      return;
    }
    // 1. 隐藏打开文件夹按钮
    doms.openDirBtn.style.display = 'none';
    // 2. 创建文件夹树形结构
  } catch (error) {
    console.error('用户不允许读取文件夹：', error);
  }
  // 2. 得到文件夹中的内容 handle.getFile();

  // 3. 读取某个文件的内容

  // 4 . 高亮显示文件内容
});

// 处理句柄
async function handleDirHandle(handle) {
  if (handle.kind === 'file') {
    return handle;
  }
  const iter = handle.entries();
  handle.children = [];
  for await (const item of iter) {
    handle.children.push(await handleDirHandle(item[1]));
  }
  return handle;
}

// 读取某个文件内容
async function getFileContent(handle) {
  if (handle.kind !== 'file') {
    return;
  }
  const file = await handle.getFile();
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = () => {
      reject(`Error occurred reading file: ${file.name}`);
    };
    reader.readAsText(file, 'utf-8');
  });
}
