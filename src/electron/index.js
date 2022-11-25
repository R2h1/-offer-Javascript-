import path from 'path';
import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // __dirname 字符串指向当前正在执行脚本所在目录 (在本例中，它指向你的项目的根文件夹)。
      // path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串。
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  // 打开开发工具
  // mainWindow.webContents.openDevTools();
};

/**
 * 只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
 */
app.whenReady().then(() => {
  createWindow();

  /**
   * macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，
   * 并且在没有窗口可用的情况下激活应用时会打开新的窗口。
   * 由于窗口无法在 ready 事件前创建，因此应当在应用初始化后仅监听 activate 事件
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/**
 * 在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序，使用 app.quit();
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
