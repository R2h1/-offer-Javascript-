/**
 * 1. 优化首页白屏
 *   优化前：
 * setTimeout(() =>
 *   createApp(App.mount('#app'));
 * }, 3000)
 *   优化后：
 * setTimeout(() =>
 *   createApp(App.mount('#app'));
 * }, 1000)
 *
 * 2. 一键清理内存
 *   <a href="javascript:alert('清理成功')">清理内存</a>
 *
 * 3. 实现B站全套功能
 *   iframe {
 *     border: none;
 *     outline: none;
 *     position: fixed;
 *     top: 0;
 *     left: 0;
 *     right: 0;
 *     bottom: 0;
 *   }
 *   <style>
 *     iframe {
 *       border: none;
 *       outline: none;
 *       position: fixed;
 *       top: 0;
 *       left: 0;
 *       right: 0;
 *       bottom: 0;
 *     }
 *   </style>
 *   <body>
 *     <iframe src="https://www.bilibili.com/"></iframe>
 *   </body>
 */
