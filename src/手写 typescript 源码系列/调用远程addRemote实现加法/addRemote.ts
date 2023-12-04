// 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现
const addRemote = async (a: number, b: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 500);
  });

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
async function add(...inputs: number[]): Promise<number> {
  // 你的实现
  if (inputs.length === 0) return 0;
  if (inputs.length === 1) return inputs[0];
  const [a, b, ...rest] = inputs;
  const res = await addRemote(await addRemote(a, b), await add(...rest));
  return res;
}

// 请用示例验证运行结果:
add(1, 2).then((result) => {
  console.log(result); // 3
});

add(3, 5, 2, 4).then((result) => {
  console.log(result); // 14
});
