export type FlightInfo = {
  /** 航班名称 */
  name: string;
  /** 航班起飞时间 */
  scheduled: string;
  /** 航班出发地 */
  departure: string;
  /** 航班到达地 */
  arrival: string;
  /** 价格信息 */
  priceInfo: FlightPricesInfo;
};

/** 航班价格信息 */
export type FlightPricesInfo = {
  [t in FlightDateType]: {
    [k in Customer]: number;
  };
};

/** 乘客类型 */
export type Customer = 'REWARD' | 'REGULAR';

/** 航班起飞日期类型 */
export enum FlightDateType {
  'WEEKDAYS' = 'WEEKDAYS',
  'WEEKENDS' = 'WEEKENDS',
}
