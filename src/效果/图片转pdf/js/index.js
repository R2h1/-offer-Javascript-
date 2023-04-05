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
