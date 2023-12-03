import { partNumberSum, gearRatiosSum } from '../src/day03';

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test('day 3-1', () => {
	expect(partNumberSum(input)).toBe(4361);
});

test('day 3-2', () => {
	expect(gearRatiosSum(input)).toBe(467835);
});
