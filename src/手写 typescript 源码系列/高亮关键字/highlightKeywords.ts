/**
 * 对文本中关键词添加高亮类名
 * @param text 待处理的文本
 * @param words 需要高亮的关键词
 * @param className 高亮类名
 * @returns
 */
export function highlightKeyWords(text: string, words: string | string[], className = 'hlkw') {
  const pattern = Array.isArray(words) ? words.join('|') : words;
  if (typeof pattern !== 'string' || !pattern.length) {
    //只能是非空字符串
    return text;
  }
  const reg = new RegExp(pattern, 'gi');
  return text.replace(reg, function (key) {
    return `<mark class="${className}">${key}</mark>`;
  });
}
