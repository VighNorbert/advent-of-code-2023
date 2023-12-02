const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((s) => {
			return {
				game: parseInt(s.split(':')[0].split(' ')[1]),
				rounds: s
					.split(':')[1]
					.trim()
					.split(';')
					.map((s1) =>
						s1
							.trim()
							.split(',')
							.map((s2) => s2.trim())
					),
			};
		});

export const belowMaxLimits = (s: string) => {
	const maxCubes = [12, 13, 14];
	let i = 0;
	parse(s).forEach((game) => {
		let flag = true;
		game.rounds.forEach((round) => {
			round.forEach((cube) => {
				if (
					(cube.split(' ')[1] == 'red' &&
						parseInt(cube.split(' ')[0]) > maxCubes[0]) ||
					(cube.split(' ')[1] == 'green' &&
						parseInt(cube.split(' ')[0]) > maxCubes[1]) ||
					(cube.split(' ')[1] == 'blue' &&
						parseInt(cube.split(' ')[0]) > maxCubes[2])
				) {
					flag = false;
				}
			});
		});
		if (flag) {
			i += game.game;
		}
	});
	return i;
};
exports.first = belowMaxLimits;

export const powersOfMinPossible = (s: string) => {
	let i = 0;
	parse(s).forEach((game) => {
		let minCubes = [0, 0, 0];
		game.rounds.forEach((round) => {
			round.forEach((cube) => {
				if (cube.split(' ')[1] == 'red') {
					minCubes[0] = Math.max(
						minCubes[0],
						parseInt(cube.split(' ')[0])
					);
				} else if (cube.split(' ')[1] == 'green') {
					minCubes[1] = Math.max(
						minCubes[1],
						parseInt(cube.split(' ')[0])
					);
				} else if (cube.split(' ')[1] == 'blue') {
					minCubes[2] = Math.max(
						minCubes[2],
						parseInt(cube.split(' ')[0])
					);
				}
			});
		});
		i += minCubes[0] * minCubes[1] * minCubes[2];
	});
	return i;
};
exports.second = powersOfMinPossible;
