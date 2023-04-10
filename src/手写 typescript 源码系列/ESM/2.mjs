// esm 中 导出的变量是符号绑定或符号连接或实时绑定（live binding）：即值引用而不是值拷贝（commonJS）
// CommonJS 模块是运行时加载，ESM是编译时输出接口
import { counter, increase } from './1.mjs'
console.log('counter改变前: ', counter);
/**
 * 导出的变量不能直接更改：Assignment to constant variable.
 * counter = counter + 1;
 */
increase();
console.log('counter改变后: ', counter);