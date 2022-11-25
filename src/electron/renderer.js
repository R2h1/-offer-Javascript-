const information = document.getElementById('info');
const chromeV = versions.dependency('chrome');
const nodeV = versions.dependency('node');
const electronV = versions.dependency('electron');
information.innerText = `本应用正在使用 Chrome (v${chromeV}), Node.js (v${nodeV}), 和 Electron (v${electronV})`;

const fetchData = async () => {
  const response = await versions.getData();
  console.log(response); // 打印 data
};
fetchData();
