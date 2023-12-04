function add(...first: number[]) {
  let sum = 0;
  function calc(...other: number[]) {
    if (other.length) {
      sum += other.reduce((prev, curr) => (prev += curr));
      return calc;
    }
    return sum;
  }
  return calc(...first);
}
