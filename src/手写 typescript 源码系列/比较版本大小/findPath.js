const findPath = function (input, target) {
  if (input === {}) {
    return [];
  }
  let stack = [];
  let path = [];
  let flag = false;
  findPathCore = function (input, target) {
    let val = input.id;
    stack.push(val);
    if (val === target) {
      path.push(...stack);
      flag = true;
    } else if (flag === false && input.children !== undefined) {
      input.children.forEach((item) => {
        findPathCore(item, target);
      });
    }
    stack.pop();
  };
  findPathCore(input, target);
  return path;
};

const input = {
  id: 1,
  children: [
    {
      id: 2,
      children: [{ id: 3 }],
    },
    {
      id: 4,
      children: [
        {
          id: 5,
          children: [{ id: 6 }, { id: 7 }, { id: 8 }],
        },
      ],
    },
  ],
};
console.log(findPath(input, 8));
