const parse = (s: string) => s.trim().split(',');

const hash = (s: string) => {
	let h = 0;
	s.split('').forEach((c) => {
		h += c.charCodeAt(0);
		h *= 17;
		h %= 256;
	});
	return h;
};

export const hashSum = (s: string) => {
	return parse(s)
		.map(hash)
		.reduce((a, b) => a + b, 0);
};
exports.first = hashSum;

export const function2 = (s: string) => {
	let boxes: { label: string; foc: number }[][] = [];
	for (let i = 0; i < 256; i++) boxes[i] = [];
	parse(s).forEach((l) => {
		if (l.includes('=')) {
			const [a, b] = l.split('=');
			let box = boxes[hash(a)];
			let li = box.findIndex((e) => e.label === a);
			if (li === -1) {
				boxes[hash(a)].push({ label: a, foc: parseInt(b) });
			} else {
				boxes[hash(a)][li].foc = parseInt(b);
			}
		} else {
			const [a, b] = l.split('-');
			boxes[hash(a)] = boxes[hash(a)].filter((e) => e.label !== a);
		}
	});

	return boxes
		.map((b, bi) =>
			b
				.map((l, li) => (li + 1) * l.foc * (bi + 1))
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b, 0);
};
exports.second = function2;
