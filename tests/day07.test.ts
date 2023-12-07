import { countScores, countScoresWithJokers } from '../src/day07';

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test('day 7-1', () => {
	expect(countScores(input)).toBe(6440);
});

test('day 7-2', () => {
	expect(countScoresWithJokers(input)).toBe(5905);
});
