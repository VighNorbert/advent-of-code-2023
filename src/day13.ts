const parse = (s: string) =>
	s
		.trim()
		.split('\n\n')
		.map((t) => t.split('\n').map((l) => l.split('')));

const reflectionLine = (
	sizes: number[],
	fn: (x: number, y: number) => string,
	allowedDiff: number = 0
) => {
	let reflection = 0;
	const [width, height] = sizes;
	for (let i = 0; i < width - 1; i++) {
		let diff = 0;
		for (let xi = 1; xi + i < width && i - xi >= -1; xi++) {
			for (let j = 0; j < height; j++) {
				if (fn(i + xi, j) !== fn(i - xi + 1, j)) {
					diff++;
					if (diff > allowedDiff) {
						break;
					}
				}
			}
			if (diff > allowedDiff) {
				break;
			}
		}
		if (diff == allowedDiff) {
			reflection = i + 1;
			break;
		}
	}
	return reflection;
};

export const sumOfReflections = (s: string, diff: number = 0) => {
	return parse(s)
		.map(
			(m) =>
				reflectionLine(
					[m[0].length, m.length],
					(x: number, y: number) => m[y][x],
					diff
				) +
				reflectionLine(
					[m.length, m[0].length],
					(x: number, y: number) => m[x][y],
					diff
				) *
					100
		)
		.reduce((a, b) => a + b, 0);
};
exports.first = sumOfReflections;

export const sumOfReflectionsWithDiff1 = (s: string) => {
	return sumOfReflections(s, 1);
};
exports.second = sumOfReflectionsWithDiff1;
