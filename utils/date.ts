/**
 * 按指定的语言环境格式化日期
 * @param date 
 * @param locale 
 * @returns 
 */
const format = (date: Date, locale: string): string => new Intl.DateTimeFormat(locale).format(date);

export {
  format
}