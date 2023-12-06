const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) =>
			line
				.split(' ')
				.filter((s) => s.length > 0)
				.slice(1)
				.map((s) => parseInt(s))
		);

const calculateWaysToWin = (times: number[], distances: number[]) => {
	return [...times]
		.map((time, i) => {
			let d = Math.sqrt(time * time - 4 * distances[i]);
			return (
				Math.ceil((time + d) / 2 - 1) -
				Math.floor((time - d) / 2 + 1) +
				1
			);
		})
		.reduce((a, b) => a * b, 1);
};

export const waysToWin = (s: string) => {
	const [times, distances] = parse(s);

	return calculateWaysToWin(times, distances);
};
exports.first = waysToWin;

const parseCollapsed = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => [parseInt(line.split(':').pop()!.replaceAll(' ', ''))]);

export const waysToWinCollapsed = (s: string) => {
	const [times, distances] = parseCollapsed(s);

	return calculateWaysToWin(times, distances);
};
exports.second = waysToWinCollapsed;
