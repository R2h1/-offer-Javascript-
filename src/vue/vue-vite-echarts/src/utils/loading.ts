import loadingUrl from '@/assets/logo.svg';

function getLoadingImage(el: Element) {
  return el.querySelector('img[data-role-loading]');
}

function createLoadingImage() {
  const img = document.createElement('img');
  img.dataset.role = 'loading';
  img.src = loadingUrl;
  return img;
}

export default function (el: Element, binding: { value: boolean }) {
  const curImg = getLoadingImage(el);
  if (binding.value) {
    if (!curImg) {
      const img = createLoadingImage();
      el.appendChild(img);
    }
  } else {
    curImg && curImg.remove();
  }
}
