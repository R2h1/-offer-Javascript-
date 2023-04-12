/**
 * 输入描述
 * 第一行输入目前的事件总数N(<=50)。
 * 随后每行给出三个正整数（共N行），按顺序依次代表事件的酬金、
 * 处理事件需要的天数以及自即日起事件必须在多少天之内完成。三个数以空格分隔。
 * 例如某一行的输入为 8 2 4，代表处理一个价值为8的事件需要2天，但是必须在4天之内完成。
 * 假设自即日起，再也没有新事件产生。
 * 输出描述
 * 输出处理这些事件最终能够获得的最大收益
 */

var n = readInt();
var eventsArr = [];
for (let i = 0; i < n; i++) {
  let everyEvent = read_line().split('');
  eventsArr.push(everyEvent);
}

function maxIncome(eventsArr) {
  let income = 0;
  return income;
}

console.log(maxIncome(eventArr));
