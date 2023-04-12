import { FlightInfo } from './type';
/**
 *  GD2501  08:00  Xi’an  Chengdu
 *  GD2606  12:25  Xi’an  Chengdu
 *  GD8732  19:30  Xi’an  Chengdu
 *
 *  GD2502  12:00  Chengdu  Xi’an
 *  GD2607  16:25  Chengdu  Xi’an
 *  GD8733  23:30  Chengdu  Xi’an
 *
 *  GD2501      ¥1100     ¥800       ¥900       ¥500
 *  GD2606      ¥1600     ¥1100      ¥600       ¥500
 *  GD8732      ¥2200     ¥1000      ¥1500      ¥400
 *
 *  GD2502      ¥1700     ¥800       ¥900       ¥800
 *  GD2607      ¥1600     ¥1100      ¥600       ¥500
 *  GD8733      ¥1600     ¥1500      ¥1000      ¥400
 *
 */
export const flightInfos: FlightInfo[] = [
  {
    name: 'GD2501',
    scheduled: '08:00',
    departure: 'Xi’an',
    arrival: 'Chengdu',
    priceInfo: {
      WEEKDAYS: {
        REGULAR: 1100,
        REWARD: 800,
      },
      WEEKENDS: {
        REGULAR: 900,
        REWARD: 500,
      },
    },
  },
  {
    name: 'GD2606',
    scheduled: '12:25',
    departure: 'Xi’an',
    arrival: 'Chengdu',
    priceInfo: {
      WEEKDAYS: {
        REGULAR: 1600,
        REWARD: 1100,
      },
      WEEKENDS: {
        REGULAR: 600,
        REWARD: 500,
      },
    },
  },
  {
    name: 'GD8732',
    scheduled: '19:30',
    departure: 'Xi’an',
    arrival: 'Chengdu',
    priceInfo: {
      WEEKDAYS: {
        REGULAR: 2200,
        REWARD: 1000,
      },
      WEEKENDS: {
        REGULAR: 1500,
        REWARD: 400,
      },
    },
  },
  {
    name: 'GD2502',
    scheduled: '12:00',
    departure: 'Chengdu',
    arrival: 'Xi’an',
    priceInfo: {
      WEEKDAYS: {
        REGULAR: 1700,
        REWARD: 800,
      },
      WEEKENDS: {
        REGULAR: 900,
        REWARD: 800,
      },
    },
  },
  {
    name: 'GD2607',
    scheduled: '16:25',
    departure: 'Chengdu',
    arrival: 'Xi’an',
    priceInfo: {
      WEEKDAYS: {
        REGULAR: 1600,
        REWARD: 1100,
      },
      WEEKENDS: {
        REGULAR: 600,
        REWARD: 500,
      },
    },
  },
  {
    name: 'GD8733',
    scheduled: '23:30',
    departure: 'Chengdu',
    arrival: 'Xi’an',
    priceInfo: {
      WEEKDAYS: {
        REGULAR: 1600,
        REWARD: 1500,
      },
      WEEKENDS: {
        REGULAR: 1000,
        REWARD: 400,
      },
    },
  },
];
