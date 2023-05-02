export function asyncReplaceAll(str: string, searchValue: string | RegExp, replaceValue: string): string;
export function asyncReplaceAll(
  str: string,
  searchValue: string | RegExp,
  replacer: (...args: any[]) => string
): string;
export function asyncReplaceAll(
  str: string,
  searchValue: string | RegExp,
  replacer: string | ((...args: any[]) => string)
) {
  if (typeof replacer === 'string') {
    return str.replaceAll(searchValue, replacer);
  }
  if (typeof replacer !== 'function') {
    throw new TypeError('param replacer should be an async function or string');
  }
  let reg;
  if (typeof searchValue === 'string') {
    reg = new RegExp(searchValue.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'g');
  } else if (searchValue instanceof RegExp) {
    if (!searchValue.global) {
      throw new TypeError('param searchValue should has global flag if it is a RegExp');
    }
    reg = new RegExp(searchValue);
  } else {
    throw new TypeError('param searchValue should be a string or RegExp');
  }
  let match;
  const parts = [];
  let lastIndex = 0;
  while ((match = reg.exec(str)) !== null) {
    const subConstStr = str.substring(lastIndex, match.index);
    lastIndex = reg.lastIndex;
    const args = match.groups
      ? [...match, match.index, match.input, match.groups]
      : [...match, match.index, match.input];
    const prom = replacer(...args);
    parts.push(subConstStr, prom);
  }
  parts.push(str.substring(lastIndex));
  return Promise.all(parts).then((res) => {
    return res.join('');
  });
}
