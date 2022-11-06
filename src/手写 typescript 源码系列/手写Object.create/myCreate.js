Object.prototype.myCreate = function (p) {
  function F() {}
  F.prototype = p;
  return new F();
};
