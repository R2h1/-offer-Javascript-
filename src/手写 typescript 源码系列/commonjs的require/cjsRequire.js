function cjsRequire(modulePath) {
  // 1. 根据传递的模块路径得到模块完整的绝对路径
  const moduleId = getModuleId(modulePath);
  // 2. 判断缓存
  const moduleCache = cache[moduleId];
  if (moduleCache) {
    return moduleCache;
  }
  // 3. 运行模块中代码的辅助函数
  function _run(exports, require, module, __filename, __dirname) {
    // 模块中的代码
    this.a = 1;
    exports.b = 2;
    exports = {
      c: 3,
    };
    module.exports = {
      d: 4,
    };
    exports.e = 5;
    this.f = 6;

    /**
     * 最终 require 这个模块导出的是 module.exports 即：
     * {
     *    d: 4
     * }
     */
  }
  // 4. 准备并运行辅助函数
  const module = {
    exports: {},
  };
  const exports = module.exports;
  const __filename = moduleId;
  const __dirname = getDirname(__filename);
  _run.call(exports, exports, cjsRequire, module, __filename, __dirname);
  // 5. 缓存模块 module.exports
  cache[moduleId] = module.exports;
  // 6. 返回模块 module.exports
  return module.exports;
}

export { cjsRequire };
