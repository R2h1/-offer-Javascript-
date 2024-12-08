/**
 * 有很多 IP 地址，如何最快的找出 RTT 最短的 IP 地址
 * 假设最大并发数为 10
 * [RTT, Round-Trip Time]
 */

type ResultType = {
  ip: string;
  rtt: number;
};

async function getShortestRTT(ips: string[], parallelCount = 10) {
  const ipChunks = chunk(ips, parallelCount);
  let res = {
    ip: '',
    rtt: Infinity
  } as ResultType;
  for (let chunk of ipChunks) {
    const temp = await race(chunk, res.rtt);
    if (temp) {
      res = temp;
    }
  }
  return res;
}

const chunk = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => {
    return arr.slice(size * i, size * (i + 1));
  });
};

const race = (ips: string[], maxTime: number): Promise<ResultType | null> => {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      resolve(null);
      controller.abort();
    }, maxTime);
    for (let ip of ips) {
      let start = Date.now();
      fetch(`http://${ip}/ping`, { signal }).then(() => {
        const rtt = Date.now() - start;
        resolve({
          ip,
          rtt
        });
        controller.abort();
      });
    }
  });
};
