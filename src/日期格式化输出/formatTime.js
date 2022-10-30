Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    ms: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 2 ? '星期' : '周') + ['日', '一', '二', '三', '四', '五', '六'][this.getDay()]
    );
  }
  if (/(q+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 3 ? '第' : '') + ['一', '二', '三', '四'][Math.floor((this.getMonth() + 3) / 3)] + '季度'
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};
var time1 = new Date().format('yyyy-MM-dd HH:mm:ss');
var time2 = new Date().format('yy-MM-dd HH:mm:ss');
var time3 = new Date().format('yyyy-MM-dd HH:mm:ss.ms');
var time4 = new Date().format('yyyy-MM-dd ww HH:mm:ss.ms');
var time5 = new Date().format('yyyy-MM-dd www HH:mm:ss.ms');
var time5 = new Date().format('yyyy-MM-dd qqq www HH:mm:ss.ms');
var time6 = new Date().format('yyyy-MM-dd qqqq www HH:mm:ss.ms');

console.log(time1);
console.log(time2);
console.log(time3);
console.log(time4);
console.log(time5);
console.log(time6);
