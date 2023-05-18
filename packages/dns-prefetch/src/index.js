import fs from 'fs';
import { glob } from 'glob';
import { parse } from 'node-html-parser';
import urlRegex from 'url-regex';

// 获取跨域链接的正则表达式
const urlPattern = /(https?:\/\/[^/]*)/i;
const urls = new Set();

// 遍历 dist 目录中的所有 HTML、JS、CSS 文件
async function searchDomain() {
  const files = await glob('dist/**/*.{html,css,js}');
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8');
    const matches = source.match(urlRegex({ strict: true }));
    if (matches) {
      matches.forEach((url) => {
        const match = url.match(urlPattern);
        if (match && match[1]) {
          urls.add(match[1]);
        }
      });
    }
  }
}

// 在 <head> 标签中添加 dns 预获取链接
async function insertLinks() {
  const files = await glob('dist/**/*.html');
  const links = [...urls].map((url) => `<link rel="dns-prefetch" href="${url}" />`).join('\n');

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf-8');
    const root = parse(html);
    const head = root.querySelector('head');
    head?.insertAdjacentHTML('afterbegin', links);
    fs.writeFileSync(file, root.toString());
  }
}

async function main() {
  await searchDomain();
  await insertLinks();
}

export default main();

/**
 * 如何使用？
 * 在 package.json 文件的 scripts 选项中的 build 命令的末尾添加 "&& node [./scripts]/dns-prefetch.js"
 */
