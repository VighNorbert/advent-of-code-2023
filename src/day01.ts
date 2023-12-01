const parse = (s: string) => s.trim().split('\n');

export const calibrationSum = (s: string) => {
	return parse(s)
		.map((s) =>
			s
				.split('')
				.filter((c) => c >= '0' && c <= '9')
				.join('')
		)
		.map((s) => s.slice(0, 1) + s.slice(-1))
		.map((s) => parseInt(s, 10))
		.reduce((a, b) => a + b);
};

exports.first = calibrationSum;

const numMap: Record<string, string> = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

export const calibrationSumWithStrings = (s: string) => {
	return parse(s)
		.map((s) => {
			for (let i = 0; i < s.length; i++) {
				for (const [k, v] of Object.entries(numMap)) {
					if (s.slice(i).startsWith(k)) {
						s = s.slice(0, i) + v + s.slice(i + 1);
					}
				}
			}
			return s;
		})
		.map((s) =>
			s
				.split('')
				.filter((c) => c >= '0' && c <= '9')
				.join('')
		)
		.map((s) => s.slice(0, 1) + s.slice(-1))
		.map((s) => parseInt(s, 10))
		.reduce((a, b) => a + b);
};

exports.second = calibrationSumWithStrings;
