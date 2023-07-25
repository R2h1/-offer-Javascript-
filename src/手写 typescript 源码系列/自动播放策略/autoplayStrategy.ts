/**
 * chrome 的自动播放策略:
 *   1.始终允许静音自动播放
 *   2.以下情况带声音的允许自动播放：
 *      a.用户已经与当前域进行了交互（click、tap）。
 *      b.在桌面设备上，用户的媒体参与度指数阈值已经超过，这意味着用户之前播放过有声视频。
 *      c.用户已将网站添加到移动设备上的主屏幕或在桌面安装了PWA。
 *   3.顶部帧可以将自动播放权限委派给其 iframe, 以允许自动播放。
 *
 * 媒体参与度（MEI，Media Engagement Index),衡量个人在网站上使用多媒体的倾向。它是一个数字，可以通过chrome://media-engagement/查看。
 * 数值越高，用户对该站点的媒体参与度越高，就越有机会自动播放。
 * 对开发者而言：
 *   1.媒体参与度的计算规则无法通过技术手段更改。
 *   2.媒体参与度的计算规则不同版本的浏览器可能会有变动。
 *
 * 开发者的最佳实现
 *   方案1：互动后播放
 *     先尝试自动播放，若发生异常，则引导用户进行互动操作，然后再进行播放。
 *     const video = document.querySelector('video'); // 视频元素
 *     const modal = document.querySelector('.modal'); // modal 为互动操作蒙层
 *     const btn = document.querySelector('.btn'); // btn 为互动操作蒙层中的开始播放按钮
 *     async function play() {
 *       try {
 *         await video.play();
 *         modal.style.display = 'none';
 *         btn.removeEventListener('click', play);
 *       } catch (err) {
 *         modal.style.display = 'flex';
 *         btn.addEventListener('click, play);
 *       }
 *     }
 *     play();
 *   方案2：互动后出声
 *     先静音播放，然后根据是否能自动播放决定是否取消静音，如果：
 *       1.能自动播放，则取消静音。
 *       2.不能自动播放，引导用户进行互动操作后取消静音。
 *     const video = document.querySelector('video'); // 视频元素
 *     const modal = document.querySelector('.modal'); // modal 为互动操作蒙层
 *     const btn = document.querySelector('.btn'); // btn 为互动操作蒙层中的打开声音按钮
 *     function play() {
 *       video.muted = true; // 静音
 *       video.play();
 *       // 利用音频上下文判断是否能自动播放
 *       const ctx = new AudioContext();
 *       const canAutoPlay = ctx.state === 'running';
 *       ctx.close();
 *       if (canAutoPlay) {
 *         video.muted = false;
 *         modal.style.display = 'none';
 *         btn.removeEventListener('click', play);
 *       } else {
 *         modal.style.display = 'flex';
 *         btn.addEventListener('click, play);
 *       }
 *     }
 */
