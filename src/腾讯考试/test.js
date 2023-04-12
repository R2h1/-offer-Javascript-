Number.prototype.add = function (value) {
  return this + value;
};

Number.prototype.minus = function (value) {
  return this - value;
};

console.log((1).add(3).minus(2));
