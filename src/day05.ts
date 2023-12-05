const parse = (s: string) => {
	const game = s.trim().split('\n');
	const seeds = game[0]
		.substring(7)
		.split(' ')
		.map((i) => parseInt(i));

	let maps: number[][][] = [];
	let i = 3;
	while (i < game.length) {
		let div = game.slice(i).findIndex((l) => l === '');
		if (div === -1) {
			div = game.length - i;
		}
		const map = game
			.slice(i, i + div)
			.map((l) => l.split(' ').map((i) => parseInt(i)));
		maps.push(map);
		i += div + 2;
	}
	return { seeds, maps };
};

export const lowestLocationNumber = (s: string) => {
	const { seeds, maps } = parse(s);

	return seeds
		.map((seed) => {
			maps.forEach((map) => {
				let flag = true;
				map.forEach((row) => {
					if (flag && row[1] <= seed && row[1] + row[2] > seed) {
						seed = row[0] + seed - row[1];
						flag = false;
					}
				});
			});
			return seed;
		})
		.reduce((a, b) => (a > b ? b : a), 9999999999999);
};
exports.first = lowestLocationNumber;

const parseAdvanced = (s: string) => {
	const game = s.trim().split('\n');
	const seedRanges = game[0]
		.substring(7)
		.split(' ')
		.map((i) => parseInt(i))
		.map((v, index, input) => [v, input[index + 1]])
		.filter((v, index) => index % 2 === 0);

	let maps: number[][][] = [];
	let i = 3;
	while (i < game.length) {
		let div = game.slice(i).findIndex((l) => l === '');
		if (div === -1) {
			div = game.length - i;
		}
		const map = game
			.slice(i, i + div)
			.map((l) => l.split(' ').map((i) => parseInt(i)));
		maps.push(map);
		i += div + 2;
	}
	return { seedRanges, maps };
};

const transform = (seed: number, mapper: number[]) => {
	return seed + mapper[0] - mapper[1];
};

export const lowestLocationNumberOverRange = (s: string) => {
	let { seedRanges, maps } = parseAdvanced(s);

	maps.forEach((map) => {
		let newSeeds: number[][] = [];
		for (let i = 0; i < seedRanges.length; i++) {
			let seedRange = seedRanges[i];
			let match = false;
			map.forEach((row) => {
				if (
					row[1] <= seedRange[0] &&
					row[1] + row[2] >= seedRange[0] + seedRange[1]
				) {
					newSeeds.push([transform(seedRange[0], row), seedRange[1]]);
					match = true;
				} else if (
					row[1] <= seedRange[0] &&
					row[1] + row[2] - 1 >= seedRange[0]
				) {
					newSeeds.push([
						transform(seedRange[0], row),
						row[1] + row[2] - seedRange[0],
					]);
					seedRanges.push([
						row[1] + row[2],
						seedRange[0] + seedRange[1] - row[1] - row[2],
					]);
					match = true;
				} else if (
					row[1] <= seedRange[0] + seedRange[1] - 1 &&
					row[1] + row[2] >= seedRange[0] + seedRange[1]
				) {
					newSeeds.push([
						transform(row[1], row),
						seedRange[0] + seedRange[1] - row[1],
					]);
					seedRanges.push([seedRange[0], row[1] - seedRange[0]]);
					match = true;
				} else if (
					row[1] >= seedRange[0] &&
					row[1] + row[2] <= seedRange[0] + seedRange[1]
				) {
					newSeeds.push([transform(row[1], row), row[2]]);
					seedRanges.push([
						row[1] + row[2],
						seedRange[0] + seedRange[1] - row[1] - row[2],
					]);
					seedRanges.push([seedRange[0], row[1] - seedRange[0]]);
					match = true;
				}
			});
			if (!match) {
				newSeeds.push(seedRange);
			}
		}
		seedRanges = newSeeds;
	});

	return seedRanges.reduce((a, b) => (a > b[0] ? b[0] : a), 9999999999999);
};
exports.second = lowestLocationNumberOverRange;
