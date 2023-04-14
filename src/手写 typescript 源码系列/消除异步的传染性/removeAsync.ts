async function getUser() {
  return fetch('https://example').then((resp) => resp.json());
}

async function m1() {
  return await getUser();
}

async function m2() {
  return await m1();
}

async function m3() {
  return await m2();
}

function main() {
  const user = m3();
  console.log(user);
}

main();

/**
 * 消除异步的传染性：将上述所有函数的调用采用同步的方式，同时能在main里输出正确的结果
 *    同步就必须让函数立即结束，可以通过报错的方式让函数结束，原始 fetch 在后台进行
 *    对 fetch 函数后台运行的结果进行缓存，通过二次调用fetch的时候直接取缓存结果即可
 */
type Status = 'pending' | 'fulfilled' | 'rejected';
function run(func: Function) {
  let caches: {
    status: Status;
    data: any;
    err: any;
  }[] = [];
  let i = 0; // func 某一次运行中，内部调用 fetch 的标识
  const _originFetch = window.fetch;
  window.fetch = (...args) => {
    const cache = caches[i];
    // 存在缓存
    if (cache) {
      const { status, data, err } = cache;
      if (status === 'fulfilled') {
        return data;
      } else if (status === 'rejected') {
        throw err;
      }
    }
    const result = {
      status: 'pending' as Status,
      data: null,
      err: null,
    };
    caches[i] = result;
    i = i + 1;
    const promise = _originFetch(...args)
      .then((resp) => resp.json())
      .then(
        (value) => {
          result.data = value;
          result.status = 'fulfilled';
        },
        (reason) => {
          result.err = reason;
          result.status = 'rejected';
        }
      );
    throw promise;
  };
  try {
    func();
  } catch (err) {
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0;
        func();
      };
      err.then(reRun, reRun);
    }
  }
}

run(main);
