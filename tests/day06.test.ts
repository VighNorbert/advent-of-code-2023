import { waysToWin, waysToWinCollapsed } from '../src/day06';

const input = `Time:      7  15   30
Distance:  9  40  200`;

test('day 6-1', () => {
	expect(waysToWin(input)).toBe(288);
});

test('day 6-2', () => {
	expect(waysToWinCollapsed(input)).toBe(71503);
});
