/**
 * 实现以下 add
 * add[1][2][3] + 4 = 10
 * add[10][20] + 30 = 60
 */
export const add: AnyObject = new Proxy(
  {
    sum: 0,
  },
  {
    get(target, property, receiver) {
      if (property === Symbol.toPrimitive) {
        return () => {
          const result = target.sum;
          target.sum = 0;
          return result;
        };
      }
      const num = Number(property);
      if (Number.isNaN(num)) {
        throw new TypeError(`property must be a number or string number, but give a "${String(property)}"`);
      }
      target.sum = target.sum + num;
      return receiver;
    },
  }
);

console.log(add[1][2][3] + 4);
console.log(add[10][20] + 30);
