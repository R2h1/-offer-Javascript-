export function myAjax({
  url = '',
  type = 'GET',
  dataType = 'json',
  data = null,
  success = (xhr: XMLHttpRequest) => {},
  fail = (xhr: XMLHttpRequest) => {},
} = {}) {
  // 1、创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();
  // 2、发送请求
  if (type.toUpperCase() === 'GET') {
    xhr.open('GET', url + '?' + data, true);
  } else if (type === 'POST') {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
      success?.(this);
    } else {
      fail?.(this);
    }
  };
  xhr.onerror = function () {
    fail?.(this);
  };
  xhr.send(data);
}
