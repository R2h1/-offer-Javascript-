/**
 * 该函数返回一个 Promise
 * @param {number} ms
 * @returns {Promise}
 */
export default function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
}
