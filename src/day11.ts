const parse = (s: string) => s.trim().split('\n');

const expand = (inp: string[]) => {
	let emptyRows = [];
	let emptyCols = [];
	for (let i = 0; i < inp.length; i++) {
		if (inp[i].split('').every((c) => c === '.')) {
			emptyRows.push(i);
		}
	}
	for (let i = 0; i < inp[0].length; i++) {
		if (inp.map((l) => l.split('')[i]).every((c) => c === '.')) {
			emptyCols.push(i);
		}
	}
	return { emptyRows, emptyCols };
};

export const calculateSumOfAllDistances = (
	s: string,
	expansionMultiplier: number = 2
) => {
	let gameMap = parse(s);

	let { emptyRows, emptyCols } = expand(gameMap);

	return gameMap
		.map((l, y) =>
			l
				.split('')
				.map((c, x) => (c === '#' ? { x: x, y: y } : null))
				.filter((c) => c !== null)
		)
		.flat()
		.map((galaxy, index, galaxyMap) =>
			galaxyMap
				.filter((otherGalaxy, otherIndex) => otherIndex > index)
				.map(
					(otherGalaxy) =>
						Math.abs(galaxy!.x - otherGalaxy!.x) +
						Math.abs(galaxy!.y - otherGalaxy!.y) +
						(expansionMultiplier - 1) *
							emptyRows.filter(
								(r) =>
									r < Math.max(galaxy!.y, otherGalaxy!.y) &&
									r > Math.min(galaxy!.y, otherGalaxy!.y)
							).length +
						(expansionMultiplier - 1) *
							emptyCols.filter(
								(c) =>
									c < Math.max(galaxy!.x, otherGalaxy!.x) &&
									c > Math.min(galaxy!.x, otherGalaxy!.x)
							).length
				)
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b);
};
exports.first = calculateSumOfAllDistances;

export const calculateSumOfAllLongDistances = (s: string) => {
	return calculateSumOfAllDistances(s, 1000000);
};
exports.second = calculateSumOfAllLongDistances;
