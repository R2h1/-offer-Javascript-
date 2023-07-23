const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const nativeDialog = document.querySelector('.native-dialog');

const innerOpenBtn = document.querySelector('.inner-open-btn');
const innerCloseBtn = document.querySelector('.inner-close-btn');
const innerNativeDialog = document.querySelector('.inner-native-dialog');

openBtn.addEventListener('click', function (e) {
  nativeDialog.showModal();
});
closeBtn.addEventListener('click', function (e) {
  nativeDialog.close();
});

innerOpenBtn.addEventListener('click', function (e) {
  innerNativeDialog.showModal();
});
innerCloseBtn.addEventListener('click', function (e) {
  innerNativeDialog.close();
});
