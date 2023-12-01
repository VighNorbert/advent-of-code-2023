import { function1, function2 } from '../src/empty';

const input = ``;

test('day 99-1', () => {
	expect(function1(input)).toBe(-1);
});

test('day 99-2', () => {
	expect(function2(input)).toBe(-1);
});
