/**
 * vite, webpack 是静态分析，SFC在进行打包时，会分析 <img>的src, backgroundImage，import, new URL
 * 1. 导入所有静态资源，逐一 if 判定进行匹配，缺点是比较麻烦和很笨
 * 2. 将静态资源放入 public 目录下，而不是 src 的 assets 目录下，然后使用绝对路径进行访问，缺点是会丢失文件指纹，打包出来的是资源的原始路径
 * 3. 动态导入资源，vite会将所有静态资源生成打包结果，缺点是会多余生成很多js文件，且动态导入是异步的。
 * 4. 使用URL构造函数 const obj = new URL(`./assets/${}.jpg`, import.meta.url); 优点是打包过后的结果没有 js 文件，且是同步的。
 *  const url = compute(() => {
 *    const obj = new URL(`./assets/${}.jpg`, import.meta.url);
 *    return obj.pathname;
 *  })
 */
