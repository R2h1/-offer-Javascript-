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

doms.input.addEventListener('change', function (e) {
  const { files } = e.target;
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
});

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
