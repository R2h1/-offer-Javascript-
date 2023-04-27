interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  miniSecond: number;
}
type Formatter = string | ((dateInfo: DateInfo) => string);
/**
 * 格式化一个日期
 * @param {Date} date 日期对象
 * @param {Function | String} formatter 格式
 * @param {Boolean} isPadZero 是否补0
 * @example
 *  formate(new Date(), 'date'); // 2023-4-27
 *  formate(new Date(), 'datetime'); // 2023-4-27 9:3:22.6
 *  formate(new Date(), 'date', true); // 2023-04-27
 *  formate(new Date(), 'datetime', true); // 2023-04-27 09:03:22.006
 *  formate(new Date(), 'yyyy年MM月dd日 HH:mm:ss.ms'); // 2023年4月27日 10:53:22.456
 *  formate(new Date(2022/1/1), (dateInfo) => {
 *    const { year } = dateInfo;
 *    const thisYear = new Date().getFullYear();
 *    if (year < thisYear) {
 *      return `${thisYear - year}年前`;
 *    } else if (year > thisYear) {
 *      return `${year - thisYear}年后`;
 *    }
 *    return '今年';
 *  }); // 1年前
 */
export function formate(date: Date, formatter: Formatter, isPadZero = false) {
  const formatterFunc = _parameterNormalization(formatter, isPadZero);
  const dateInfo: DateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    miniSecond: date.getMilliseconds(),
  };
  return formatterFunc(dateInfo);
}
/**
 * 对可能调用的方式进行参数归一化
 * @param formatter
 * @param isPadZero
 * @returns
 */
function _parameterNormalization(formatter: Formatter, isPadZero: boolean): (dateInfo: DateInfo) => string {
  if (typeof formatter === 'function') {
    return formatter;
  }
  if (typeof formatter !== 'string') {
    throw new TypeError('Except for function, params formatter must be a string!');
  }
  if (formatter === 'date') {
    formatter = 'yyyy-MM-dd';
  } else if (formatter === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm:ss';
  }

  const formatterFunc = (dateInfo: DateInfo) => {
    const { year, month, day, hour, minute, second, miniSecond } = dateInfo;
    function _padZero(value: number, len: number) {
      return String(value).padStart(len, '0');
    }
    if (isPadZero) {
      return (formatter as string)
        .replace('yyyy', _padZero(year, 4))
        .replace('MM', _padZero(month, 2))
        .replace('dd', _padZero(day, 2))
        .replace('HH', _padZero(hour, 2))
        .replace('mm', _padZero(minute, 2))
        .replace('ss', _padZero(second, 2))
        .replace('ms', _padZero(miniSecond, 3));
    }
    return (formatter as string)
      .replace('yyyy', String(year))
      .replace('MM', String(month))
      .replace('dd', String(day))
      .replace('HH', String(hour))
      .replace('mm', String(minute))
      .replace('ss', String(second))
      .replace('ms', String(miniSecond));
  };

  return formatterFunc;
}
