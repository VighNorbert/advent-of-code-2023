import { calibrationSum, calibrationSumWithStrings } from '../src/day01';

test('day 1-1', () => {
	expect(
		calibrationSum(`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`)
	).toBe(142);
});

test('day 1-2', () => {
	expect(
		calibrationSumWithStrings(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)
	).toBe(281);
});
