const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((l) => l.split(' ').map((n) => parseInt(n, 10)));

const reduceListsToZero = (line: number[]) => {
	let lists = [[...line]];
	while (lists[lists.length - 1].reduce((a, b) => a + b, 0) != 0) {
		const last = lists[lists.length - 1];
		const next = last.map((n, i, a) => a[i + 1] - n).slice(0, -1);
		lists.push(next);
	}
	return lists;
};

export const sumOfPredictedValues = (s: string) => {
	const numbers = parse(s);
	return numbers
		.map((line) => {
			let lists = reduceListsToZero(line);
			lists[lists.length - 1].push(0);
			for (let i = lists.length - 2; i >= 0; i--) {
				let a = lists[i + 1].length;
				let b = lists[i].length;
				lists[i].push(lists[i + 1][a - 1] + lists[i][b - 1]);
			}
			return lists[0][lists[0].length - 1];
		})
		.reduce((a, b) => a + b, 0);
};
exports.first = sumOfPredictedValues;

export const sumOfPredictedValuesAtStart = (s: string) => {
	const numbers = parse(s);
	return numbers
		.map((line) => {
			let lists = reduceListsToZero(line);
			lists[lists.length - 1] = [0, ...lists[lists.length - 1]];
			for (let i = lists.length - 2; i >= 0; i--) {
				let a = lists[i][0] - lists[i + 1][0];
				lists[i] = [a, ...lists[i]];
			}
			return lists[0][0];
		})
		.reduce((a, b) => a + b, 0);
};
exports.second = sumOfPredictedValuesAtStart;
