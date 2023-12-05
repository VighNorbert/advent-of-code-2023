const parse = (s: string) => s.trim().split('\n');

export const sumOfPoints = (s: string) => {
	return parse(s)
		.map((card: string) => {
			let parts = card.split('|');
			let winning = parts[0]
				.split(':')[1]
				.trim()
				.split(' ')
				.map((n: string) => parseInt(n))
				.filter((n: number) => n > 0);
			let available = parts[1]
				.trim()
				.split(' ')
				.map((n: string) => parseInt(n));
			let matching = 0;
			winning.forEach((n: number) => {
				if (available.indexOf(n) > -1) {
					matching++;
				}
			});
			if (matching > 0) {
				return 2 ** (matching - 1);
			}
			return 0;
		})
		.reduce((a: number, b: number) => a + b, 0);
};
exports.first = sumOfPoints;

export const scratchCardsCount = (s: string) => {
	const wins = parse(s).map((card: string) => {
		let parts = card.split('|');
		let winning = parts[0]
			.split(':')[1]
			.trim()
			.split(' ')
			.map((n: string) => parseInt(n))
			.filter((n: number) => n > 0);
		let available = parts[1]
			.trim()
			.split(' ')
			.map((n: string) => parseInt(n));
		let matching = 0;
		winning.forEach((n: number) => {
			if (available.indexOf(n) > -1) {
				matching++;
			}
		});
		return matching;
	});

	let counts = new Array(wins.length).fill(1);

	for (let i = 0; i < wins.length; i++) {
		for (let j = 0; j < wins[i]; j++) {
			counts[i + 1 + j] += counts[i];
		}
	}

	return counts.reduce((a: number, b: number) => a + b, 0);
};
exports.second = scratchCardsCount;
