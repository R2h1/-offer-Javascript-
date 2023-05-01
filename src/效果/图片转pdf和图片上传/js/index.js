const doms = {
  img: document.querySelector('.preview'),
  container: document.querySelector('.upload'),
  selectBox: document.querySelector('.upload-select'),
  input: document.querySelector('.upload-select input'),
  progress: document.querySelector('.upload-progress'),
  cancelBtn: document.querySelector('.upload-progress button'),
  deleteBtn: document.querySelector('.upload-result button'),
  savePDFBtn: document.querySelector('.upload-result .save-pdf'),
};

function showArea(areaName) {
  doms.container.className = `upload ${areaName}`;
}

function setProgress(value) {
  doms.progress.style.setProperty('--percent', value);
  doms.progress.querySelector('.value').textContent = `${value}%`;
}

function validateFile(file) {
  const limit = 1 * 1024 * 1024;
  if (file.size > limit) {
    return false;
  }

  const legalExts = ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'];
  const name = file.name.toLowerCase();
  if (!legalExts.some((ext) => name.endsWith(ext))) {
    return false;
  }
  return true;
}

function upload(file, onProgress, onFinish) {
  // const xhr = new XMLHttpRequest();
  // xhr.onload = function(e) {
  //   const resp = JSON.parse(xhr.responseText);
  //   onFinish(resp);
  // }
  // xhr.upload.progress = function(e) {
  //   const percent = Math.floor((e.loaded / e.total) * 100);
  //   onProgress(percent);
  // }
  // xhr.open('POST', 'http://example.com/upload/single')
  // const form = new FormData();
  // form.append('avatar', file);
  // xhr.send(form);
  // return function() {
  //   xhr.abort();
  // }
  let progress = 0;
  let timer = null;
  onProgress(progress);
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  timer = setInterval(() => {
    progress = progress + 1;
    onProgress(progress);
    if (progress === 100) {
      onFinish('服务器响应结果');
      stop();
    }
  }, 40);
  return stop;
}

let cancelUpload = null;
function cancel() {
  cancelUpload && cancelUpload();
  showArea('select');
  doms.input.value = null;
  doms.img.src = '';
  doms.img.removeEv;
}

doms.selectBox.addEventListener('click', function () {
  doms.input.click();
});

/**
 * 拖拽上传
 */
let dragenterElement;
doms.selectBox.addEventListener('dragenter', function (e) {
  e.preventDefault();
  dragenterElement = e.target;
  doms.selectBox.classList.add('dragging');
});
doms.selectBox.addEventListener('dragleave', function (e) {
  e.preventDefault();
  if (dragenterElement === e.target) {
    doms.selectBox.classList.remove('dragging');
  }
});
doms.selectBox.addEventListener('dragover', function (e) {
  e.preventDefault();
});
doms.selectBox.addEventListener('drop', function (e) {
  e.preventDefault();
  const { files, types } = e.dataTransfer;
  if (!types.includes('Files')) {
    alert('仅支持拖拽文件');
    return;
  }
  if (files.length !== 1) {
    alert('仅支持上传单个文件');
    return;
  }
  doms.selectBox.classList.remove('dragging');
  doms.input.files = files;
  changeHandler();
});

function changeHandler() {
  const files = doms.input.files;
  if (!files.length) {
    return;
  }
  const file = files[0];
  if (!validateFile(file)) {
    return;
  }
  // 预览图显示（dataURL）
  // dataURL 还可以作为 script 标签的 src
  // 自定义生成一个 data:application/javascript,alert('这是通过dataURL执行js代码的脚本') 的 dataURL
  // 比使用 eval 生成 js 代码要好
  const reader = new FileReader();
  reader.onload = (e) => {
    const { result } = e.target;
    // 切换界面
    showArea('progress');
    doms.img.src = result;
    cancelUpload = upload(
      file,
      (value) => {
        setProgress(value);
      },
      () => {
        showArea('result');
      }
    );
  };
  reader.readAsDataURL(file);
}

doms.input.addEventListener('change', changeHandler);

doms.savePDFBtn.addEventListener('click', function (e) {
  const source = doms.img.getAttribute('src');
  if (source) {
    const pdf = window.jspdf.jsPDF('p', 'pt');
    pdf.addImage(source, 'png', 0, 0);
    pdf.save('img.pdf');
  }
});

doms.cancelBtn.addEventListener('click', cancel);
doms.deleteBtn.addEventListener('click', cancel);

/**
 * 下载html
 * @param html
 */
function downloadAsHTML(html) {
  const blob = new Blob([
    html,
    {
      type: 'text/html',
    },
  ]);
  const a = document.createElement('a');
  /* URL.createObjectURL创建一个表示 blob 的URL对象 */
  a.href = window.URL.createObjectURL(blob);
  a.style.display = none;
  a.click();
}

/**
 * 给需要支持迅雷下载的替换 href
 */
function thunderDownload() {
  const links = document.querySelectorAll('a[data-thunder]');
  for (let link of links) {
    link.href = `thunder://${window.btoa(`AA${link.href}ZZ`)}`;
  }
}

/**
 * 读取一个chunk的数据
 * @param {*} chunk
 * @returns
 */
function readChunk(chunk) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const bytes = e.target.result;
        resolve(bytes);
      };
      reader.readAsArrayBuffer(chunk);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * 计算文件的MD5
 */
function computeMD5(chunks) {
  return new Promise(async (resolve, reject) => {
    try {
      const spark = new SparkMD5();
      for (const chunk of chunks) {
        const chunkData = await readChunk(chunk);
        spark.append(chunkData);
      }
      resolve(spark.end());
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * 对文件进行切片
 * @param {File} file
 * @param {Number} chunkSize
 * @returns
 */
function createChunks(file, chunkSize = 1024 * 1024) {
  const res = [];
  const { size } = file;
  for (let i = 0; i < size; i = i + chunkSize) {
    res.push(file.slice(i, i + chunkSize));
  }
  return res;
}
