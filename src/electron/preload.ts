/**
 * 通过预加载脚本从渲染器访问Node.js
 *  1. 不能直接在主进程中编辑DOM，因为它无法访问渲染器 文档 上下文。 它们存在于完全不同的进程。
 *  2. 预加载脚本在渲染器进程加载之前加载，并有权访问两个渲染器全局 (例如 window 和 document) 和 Node.js 环境
 */
/**
 * 访问 Node.js process.versions 对象，并运行一个基本的 replaceText 辅助函数将版本号插入到 HTML 文档中。
 */

const { contextBridge, ipcRenderer } = require('electron');
/**
 * 预加载脚本像 Chrome 扩展的 内容脚本（Content Script）一样，会在渲染器的网页加载之前注入。
 *  1. 不能直接在主进程中编辑DOM，因为它无法访问渲染器 document 上下文。 它们存在于完全不同的进程。
 *  2. 预加载脚本在渲染器进程加载之前加载，并有权访问两个渲染器全局 (例如 window 和 document) 和 Node.js 环境
 */
/**
 * 通过 versions 这一全局变量，将 Electron 的 process.versions 对象暴露给渲染器
 * API 将可通过 window[apiKey] 访问
 */
contextBridge.exposeInMainWorld('versions', {
  dependency: (type: string) => process.versions[type],
  /** 永远都不会想要通过预加载直接暴露整个 ipcRenderer 模块 */
  getData: () => ipcRenderer.invoke('getData'), // 暴露给渲染器，让渲染器能触发主进程中处理程序
});
