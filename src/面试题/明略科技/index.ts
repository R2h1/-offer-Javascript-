import { flightInfos } from './data';
import { Customer, FlightDateType, FlightInfo } from './type';
/**
 * 对数组以指定进行划分
 * @param arr
 * @param criteria
 * @returns
 */
export const partition = <T, _>(arr: T[], criteria: (a: T) => boolean): T[][] =>
  arr.reduce((acc, i) => (acc[criteria(i) ? 0 : 1].push(i), acc), [[] as T[], [] as T[]]);
/**
 * 处理日期是工作日还是周末
 * @param date 20160410SUN 或 20160420WED
 */
function getDateType(s: string): FlightDateType {
  const date = new Date(+s.substring(0, 4), +s.substring(4, 6) - 1, +s.substring(6, 8));
  return [0, 6].includes(date.getDay()) ? FlightDateType.WEEKENDS : FlightDateType.WEEKDAYS;
}

/**
 * 判断哪一个航班更接近12点
 */
function whichTimeNear(flightA: FlightInfo, flightB: FlightInfo, compareTime = '12: 00') {
  const fakeDate = '2022-01-01 ';
  const compare = new Date(fakeDate + compareTime).getTime();
  const timeA = new Date(fakeDate + flightA.scheduled).getTime();
  const timeB = new Date(fakeDate + flightB.scheduled).getTime();
  if (Math.abs(timeA - compare) > Math.abs(timeB - compare)) {
    return flightB;
  }
  return flightA;
}

export function getLowestPriceInDates(customer: Customer, departingDate: string, returningDate: string) {
  // 对航班进行分组
  const partitionFlightInfos = partition(flightInfos, (item: FlightInfo) => {
    return item.departure === flightInfos?.[0]?.departure;
  });
  // 获取日期类型
  const dateTypes = [getDateType(departingDate), getDateType(returningDate)];
  const cheapestFlights = partitionFlightInfos.reduce((prev, item, index) => {
    const dateType = dateTypes[index];
    // 同一天
    if (index === 1 && departingDate === returningDate) {
      // 去的最便宜航班的时间
      const fakeDate = '2022-01-01 ';
      const filterTime = new Date(fakeDate + prev[0].scheduled).getTime();
      item = item.filter((returningFlight, index) => {
        const returningFlightTime = new Date(fakeDate + returningFlight.scheduled).getTime();
        return returningFlightTime > filterTime;
      });
    }
    prev[index] = item.reduce((acc, cur) => {
      const curPrice = cur.priceInfo[dateType][customer];
      const minPrice = acc.priceInfo[dateType][customer];
      if (curPrice < minPrice) {
        return cur;
      }
      if (curPrice === minPrice) {
        return whichTimeNear(acc, cur);
      }
      return acc;
    }, item[0]);
    return prev;
  }, []);
  return [cheapestFlights[0].name, cheapestFlights[1].name];
}
