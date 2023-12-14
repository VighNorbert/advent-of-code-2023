const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((l) => l.split(''));

export const northSupportBeamLoad = (s: string) => {
	let platform = parse(s);
	let height = platform.length;

	for (let x = 0; x < platform[0].length; x++) {
		let beam = 0;
		for (let y = 0; y < height; y++) {
			if (platform[y][x] === '#') {
				beam = y + 1;
			}
			if (platform[y][x] === 'O') {
				platform[y][x] = '.';
				platform[beam][x] = 'O';
				beam++;
			}
		}
	}
	return platform
		.map((row, y) =>
			row
				.map((c) => (c === 'O' ? height - y : 0))
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b, 0);
};
exports.first = northSupportBeamLoad;

const cycle = (platform: string[][]) => {
	const height = platform.length;
	const width = platform[0].length;
	let newPlatform = platform.map((row) => row.slice());
	for (let x = 0; x < width; x++) {
		let beam = 0;
		for (let y = 0; y < height; y++) {
			if (newPlatform[y][x] === '#') {
				beam = y + 1;
			}
			if (newPlatform[y][x] === 'O') {
				newPlatform[y][x] = '.';
				newPlatform[beam][x] = 'O';
				beam++;
			}
		}
	}
	for (let y = 0; y < height; y++) {
		let beam = 0;
		for (let x = 0; x < width; x++) {
			if (newPlatform[y][x] === '#') {
				beam = x + 1;
			}
			if (newPlatform[y][x] === 'O') {
				newPlatform[y][x] = '.';
				newPlatform[y][beam] = 'O';
				beam++;
			}
		}
	}
	for (let x = 0; x < width; x++) {
		let beam = height - 1;
		for (let y = height - 1; y >= 0; y--) {
			if (newPlatform[y][x] === '#') {
				beam = y - 1;
			}
			if (newPlatform[y][x] === 'O') {
				newPlatform[y][x] = '.';
				newPlatform[beam][x] = 'O';
				beam--;
			}
		}
	}
	for (let y = 0; y < height; y++) {
		let beam = width - 1;
		for (let x = width - 1; x >= 0; x--) {
			if (newPlatform[y][x] === '#') {
				beam = x - 1;
			}
			if (newPlatform[y][x] === 'O') {
				newPlatform[y][x] = '.';
				newPlatform[y][beam] = 'O';
				beam--;
			}
		}
	}
	return newPlatform;
};

export const loadAfterBillionCycles = (s: string) => {
	let states: string[][][] = [parse(s)];
	let cycleStart = 0;
	let period = 0;
	while (true) {
		let newp = cycle(states[states.length - 1]);
		for (let i = 0; i < states.length; i++) {
			let state = states[i];
			if (
				newp.every((row, j) => row.every((c, k) => c === state[j][k]))
			) {
				cycleStart = i;
				period = states.length - cycleStart;
				break;
			}
		}
		if (period > 0) {
			break;
		}
		states = [...states, newp];
	}

	return states[((1000000000 - cycleStart) % period) + cycleStart]
		.map((row, y, state) =>
			row
				.map((c) => (c === 'O' ? state.length - y : 0))
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b, 0);
};
exports.second = loadAfterBillionCycles;
