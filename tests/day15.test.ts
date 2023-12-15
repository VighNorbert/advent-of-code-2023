import { hashSum, function2 } from '../src/day15';

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

test('day 15-1', () => {
	expect(hashSum(input)).toBe(1320);
});

test('day 15-2', () => {
	expect(function2(input)).toBe(145);
});
