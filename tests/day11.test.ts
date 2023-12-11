import {
	calculateSumOfAllDistances,
	calculateSumOfAllLongDistances,
} from '../src/day11';

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

test('day 11-1', () => {
	expect(calculateSumOfAllDistances(input)).toBe(374);
});

test('day 11-2', () => {
	expect(calculateSumOfAllDistances(input, 10)).toBe(1030);
	expect(calculateSumOfAllDistances(input, 100)).toBe(8410);
});
