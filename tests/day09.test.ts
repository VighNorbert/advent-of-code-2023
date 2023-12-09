import {
	sumOfPredictedValues,
	sumOfPredictedValuesAtStart,
} from '../src/day09';

const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test('day 9-1', () => {
	expect(sumOfPredictedValues(input)).toBe(114);
});

test('day 9-2', () => {
	expect(sumOfPredictedValuesAtStart(input)).toBe(2);
});
