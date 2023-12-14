import { northSupportBeamLoad, loadAfterBillionCycles } from '../src/day14';

const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

test('day 14-1', () => {
	expect(northSupportBeamLoad(input)).toBe(136);
});

test('day 14-2', () => {
	expect(loadAfterBillionCycles(input)).toBe(64);
});
