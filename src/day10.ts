const parse = (s: string) => s.trim().split('\n');

const initialMove = (input: string[], sloc: { y: number; x: number }) => {
	let pos = { y: sloc.y, x: sloc.x };
	let moves = 0;
	let dir = 0;
	if (pos.y > 0 && ['F', '7', '|'].includes(input[pos.y - 1][pos.x])) {
		dir = 0;
		moves++;
		pos.y--;
	} else if (
		pos.y + 1 < input.length &&
		['L', 'J', '|'].includes(input[pos.y + 1][pos.x])
	) {
		dir = 2;
		moves++;
		pos.y++;
	} else if (pos.x > 0 && ['F', 'L', '-'].includes(input[pos.y][pos.x - 1])) {
		dir = 3;
		moves++;
		pos.x--;
	} else if (
		pos.x + 1 < input[pos.y].length &&
		['7', 'J', '-'].includes(input[pos.y][pos.x + 1])
	) {
		dir = 1;
		moves++;
		pos.x++;
	}
	return { pos, moves, dir };
};

const move = (input: string[], pos: { y: number; x: number }, dir: number) => {
	switch (input[pos.y][pos.x]) {
		case 'F':
			if (dir == 0) {
				pos.x++;
				dir = 1;
			} else if (dir == 3) {
				pos.y++;
				dir = 2;
			}
			break;
		case '7':
			if (dir == 0) {
				pos.x--;
				dir = 3;
			} else if (dir == 1) {
				pos.y++;
				dir = 2;
			}
			break;
		case 'L':
			if (dir == 2) {
				pos.x++;
				dir = 1;
			} else if (dir == 3) {
				pos.y--;
				dir = 0;
			}
			break;
		case 'J':
			if (dir == 2) {
				pos.x--;
				dir = 3;
			} else if (dir == 1) {
				pos.y--;
				dir = 0;
			}
			break;
		case '-':
			if (dir == 3) {
				pos.x--;
			} else if (dir == 1) {
				pos.x++;
			}
			break;
		case '|':
			if (dir == 0) {
				pos.y--;
			} else if (dir == 2) {
				pos.y++;
			}
			break;
	}
	return { pos, dir };
};

export const findFurthestPoint = (s: string) => {
	const input = parse(s);
	const sloc = input
		.map((line, index) => {
			return { line: line, y: index };
		})
		.map((line) => {
			return { y: line.y, x: line.line.indexOf('S') };
		})
		.filter((line) => line.x !== -1)[0];

	let { pos, moves, dir } = initialMove(input, sloc);
	while (pos.x !== sloc.x || pos.y !== sloc.y) {
		({ pos, dir } = move(input, pos, dir));
		moves++;
	}

	return moves / 2;
};
exports.first = findFurthestPoint;

export const enclosedTiles = (s: string) => {
	const input = parse(s);
	let outputMap = input.map((line) => line.split('').map((c) => ' '));
	const sloc = input
		.map((line, index) => {
			return { line: line, y: index };
		})
		.map((line) => {
			return { y: line.y, x: line.line.indexOf('S') };
		})
		.filter((line) => line.x !== -1)[0];
	let up = sloc.y > 0 && ['F', '7', '|'].includes(input[sloc.y - 1][sloc.x]);
	let down =
		sloc.y + 1 < input.length &&
		['L', 'J', '|'].includes(input[sloc.y + 1][sloc.x]);
	let left =
		sloc.x > 0 && ['F', 'L', '-'].includes(input[sloc.y][sloc.x - 1]);
	let right =
		sloc.x + 1 < input[sloc.y].length &&
		['7', 'J', '-'].includes(input[sloc.y][sloc.x + 1]);
	if (up && down) {
		outputMap[sloc.y][sloc.x] = '|';
	} else if (left && right) {
		outputMap[sloc.y][sloc.x] = '-';
	} else if (up && right) {
		outputMap[sloc.y][sloc.x] = 'L';
	} else if (up && left) {
		outputMap[sloc.y][sloc.x] = 'J';
	} else if (down && right) {
		outputMap[sloc.y][sloc.x] = 'F';
	} else if (down && left) {
		outputMap[sloc.y][sloc.x] = '7';
	}

	let { pos, moves, dir } = initialMove(input, sloc);
	while (pos.x !== sloc.x || pos.y !== sloc.y) {
		outputMap[pos.y][pos.x] = input[pos.y][pos.x];
		({ pos, dir } = move(input, pos, dir));
	}

	let count = 0;
	for (let y = 0; y < outputMap.length; y++) {
		let state = 0;
		let from = 0;
		for (let x = 0; x < outputMap[y].length; x++) {
			if ('F' == outputMap[y][x]) {
				from = 1;
			} else if ('L' == outputMap[y][x]) {
				from = -1;
			} else if ('|' == outputMap[y][x]) {
				state = 1 - state;
			} else if ('J' == outputMap[y][x] && from === 1) {
				state = 1 - state;
			} else if ('7' == outputMap[y][x] && from === -1) {
				state = 1 - state;
			}
			if (state === 1 && outputMap[y][x] === ' ') {
				count++;
			}
		}
	}

	return count;
};
exports.second = enclosedTiles;
