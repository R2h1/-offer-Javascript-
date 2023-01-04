type LightType = 'red' | 'green' | 'yellow';
export const task = (timer: number, light: LightType) => {
  const lightMap = {
    red: '红灯',
    green: '绿灯',
    yellow: '黄灯',
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(lightMap[light]);
      resolve(undefined);
    }, timer);
  });
};
const taskRunner1 = async () => {
  await task(3000, 'red');
  await task(2000, 'green');
  await task(1000, 'yellow');
  taskRunner1();
};

const taskRunner2 = () => {
  task(3000, 'red')
    .then(() => task(2000, 'green'))
    .then(() => task(1000, 'yellow'))
    .then(taskRunner2);
};
