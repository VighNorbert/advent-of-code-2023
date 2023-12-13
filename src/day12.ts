const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((l) => ({
			springs: l.split(' ')[0],
			groups: l
				.split(' ')[1]
				.split(',')
				.map((n) => parseInt(n)),
		}));

const possibleArrangements = (l: number, groups: number[], start = false) => {
	let arr: string[] = [];
	if (l < 0 || l < groups.reduce((a, b) => a + b, 0) + groups.length - 1) {
		return [];
	}
	if (l == 0) {
		return [''];
	}
	if (groups.length == 0) {
		return ['.'.repeat(l)];
	}
	const g = '#'.repeat(groups[0]);

	for (let i = start ? 0 : 1; i + groups[0] <= l; i++) {
		for (let a of possibleArrangements(
			l - i - groups[0],
			groups.slice(1)
		)) {
			arr.push('.'.repeat(i) + g + a);
		}
	}
	return arr;
};

export const arrangements = (s: string) => {
	return parse(s)
		.map((l) =>
			possibleArrangements(l.springs.length, l.groups, true).filter(
				(p) =>
					l.springs
						.split('')
						.every((c, i) => c !== '#' || p[i] === '#') &&
					l.springs
						.split('')
						.every((c, i) => c !== '.' || p[i] === '.')
			)
		)
		.map((a) => a.length)
		.reduce((a, b) => a + b, 0);
};
exports.first = arrangements;

export const unfoldedArrangements = (s: string) => {
	return -1;
};
exports.second = unfoldedArrangements;
