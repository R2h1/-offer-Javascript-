/**
 * 将万亿以下得整数转成中文：
 * 175020060 表示为 一亿七千五百零二万零六十
 * 100 表示为 一百
 * 1001 表示为一千零一
 */
export function number2Chinese(num: number) {
  const splitRes = nBitSplit(num);
  const bigUnits = ['亿', '万', ''];
  const bigUnitCount = bigUnits.length;
  const digitsStrCount = splitRes.length;
  let res = '';
  for (let i = 0; i < digitsStrCount; i++) {
    const digitsStr = splitRes[i];
    const charsWithUnit = getCharsWithUnit(digitsStr);
    const bigUnit = charsWithUnit ? bigUnits[i + bigUnitCount - digitsStrCount] : '';
    res = res + charsWithUnit + bigUnit;
  }
  return res;
}

export function getCharsWithUnit(digitsStr: string) {
  const units = ['千', '百', '十', ''];
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unitNum = units.length;
  const len = digitsStr.length;
  return Array.from(digitsStr).reduce((acc, item, index) => {
    const unit = units[index + unitNum - len];
    const char = getChar(Number(item), chars);
    if (char !== chars[0]) {
      acc = `${acc}${char}${unit}`;
    } else if (acc[acc.length - 1] !== char[0]) {
      acc = `${acc}${char}`;
    }
    if (char === chars[0] && index === len - 1) {
      acc = acc.slice(0, -1);
    }
    return acc;
  }, '');
}

export function getChar(num: number, chars: string[]) {
  if ((typeof num !== 'number' && num > 9) || num < 0) {
    throw new TypeError('num 只能是 0 ~ 9 之间的整数');
  }
  return chars[num];
}
// n 位分割
export function nBitSplit(num: number, n = 4): string[] {
  const strNum = String(num);
  let res: string[] = [];
  for (let i = strNum.length; i >= 0; i = i - n) {
    let start = i - n;
    if (start < 0) {
      start = 0;
    }
    const item = strNum.substring(start, i);
    if (item) {
      res = [item].concat(res);
    }
  }
  return res;
}

console.log(number2Chinese(175020060));
console.log(number2Chinese(100));
console.log(number2Chinese(1001));
