import { arrangements, unfoldedArrangements } from '../src/day12';

const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

test('day 12-1', () => {
	expect(arrangements(input)).toBe(21);
});

test('day 12-2', () => {
	expect(unfoldedArrangements(input)).toBe(525152);
});
