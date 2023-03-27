const doms = {
  img: document.querySelector('.preview'),
  container: document.querySelector('.upload'),
  selectBox: document.querySelector('.upload-select'),
  input: document.querySelector('.upload-select input'),
  progress: document.querySelector('.upload-progress'),
  cancelBtn: document.querySelector('.upload-progress button'),
  deleteBtn: document.querySelector('.upload-result button'),
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
  // 切换界面
  showArea('progress');
  // 预览图显示（dataURL）
  const reader = new FileReader();
  reader.onload = (e) => {
    doms.img.src = e.target.result;
  };
  reader.readAsDataURL(file);

  cancelUpload = upload(
    file,
    (value) => {
      setProgress(value);
    },
    () => {
      showArea('result');
    }
  );
});

doms.cancelBtn.addEventListener('click', cancel);
doms.deleteBtn.addEventListener('click', cancel);
