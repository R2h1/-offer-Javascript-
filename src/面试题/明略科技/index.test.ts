import { getLowestPriceInDates } from './index';

const WEEKDAYS = ['20221111FRI', '20221114MON'];
const WEEKENDS = ['20221112SAT', '20221113SUN'];

test('REWORD, WEEKDAYS, WEEKENDS', () => {
  const cheapestFlights = getLowestPriceInDates('REWARD', WEEKDAYS[0], WEEKENDS[0]);
  expect(cheapestFlights[0]).toBe('GD2501');
  expect(cheapestFlights[1]).toBe('GD8733');
});

test('REWORD, WEEKENDS, WEEKDAYS', () => {
  const cheapestFlights = getLowestPriceInDates('REWARD', WEEKENDS[0], WEEKDAYS[1]);
  expect(cheapestFlights[0]).toBe('GD8732');
  expect(cheapestFlights[1]).toBe('GD2502');
});

test('REWORD, WEEKDAYS, WEEKDAYS', () => {
  const cheapestFlights = getLowestPriceInDates('REWARD', WEEKDAYS[0], WEEKDAYS[1]);
  expect(cheapestFlights[0]).toBe('GD2501');
  expect(cheapestFlights[1]).toBe('GD2502');
});

test('REWORD, WEEKENDS, WEEKENDS', () => {
  const cheapestFlights = getLowestPriceInDates('REWARD', WEEKENDS[0], WEEKENDS[1]);
  expect(cheapestFlights[0]).toBe('GD8732');
  expect(cheapestFlights[1]).toBe('GD8733');
});

test('REGULAR, WEEKDAYS, WEEKENDS', () => {
  const cheapestFlights = getLowestPriceInDates('REGULAR', WEEKDAYS[0], WEEKENDS[0]);
  expect(cheapestFlights[0]).toBe('GD2501');
  expect(cheapestFlights[1]).toBe('GD2607');
});

test('REGULAR, WEEKENDS, WEEKDAYS', () => {
  const cheapestFlights = getLowestPriceInDates('REGULAR', WEEKENDS[0], WEEKDAYS[1]);
  expect(cheapestFlights[0]).toBe('GD2606');
  expect(cheapestFlights[1]).toBe('GD2607');
});

test('REGULAR, WEEKDAYS, WEEKDAYS', () => {
  const cheapestFlights = getLowestPriceInDates('REGULAR', WEEKDAYS[0], WEEKDAYS[1]);
  expect(cheapestFlights[0]).toBe('GD2501');
  expect(cheapestFlights[1]).toBe('GD2607');
});

test('REGULAR, WEEKENDS, WEEKENDS', () => {
  const cheapestFlights = getLowestPriceInDates('REGULAR', WEEKENDS[0], WEEKENDS[1]);
  expect(cheapestFlights[0]).toBe('GD2606');
  expect(cheapestFlights[1]).toBe('GD2607');
});

test('REWORD, same WEEKENDS', () => {
  const cheapestFlights = getLowestPriceInDates('REWARD', WEEKENDS[0], WEEKENDS[0]);
  expect(cheapestFlights[0]).toBe('GD8732');
  expect(cheapestFlights[1]).toBe('GD8733');
});
