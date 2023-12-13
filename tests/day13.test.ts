import { sumOfReflections, sumOfReflectionsWithDiff1 } from '../src/day13';

const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

test('day 13-1', () => {
	expect(sumOfReflections(input)).toBe(405);
});

test('day 13-2', () => {
	expect(sumOfReflectionsWithDiff1(input)).toBe(400);
});
