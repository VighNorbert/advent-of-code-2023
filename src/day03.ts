const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(''));

const findChar = (
	map: string[][],
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	mustBeStar: boolean = false
) => {
	x1 = Math.max(0, x1);
	y1 = Math.max(0, y1);
	x2 = Math.min(map[0].length - 1, x2);
	y2 = Math.min(map.length - 1, y2);
	for (let y = y1; y <= y2; y++) {
		const line = map[y];
		for (let x = x1; x <= x2; x++) {
			if (mustBeStar && line[x] === '*') {
				return { x, y };
			}
			if (!mustBeStar && line[x] !== '.' && isNaN(parseInt(line[x]))) {
				return { x, y };
			}
		}
	}
	return null;
};

export const partNumberSum = (s: string) => {
	const map = parse(s);
	const height = map.length;
	const width = map[0].length;
	let sum = 0;
	for (let y = 0; y < height; y++) {
		const line = map[y];
		for (let x = 0; x < width; x++) {
			const c = line[x];
			let numStart: number | null = null;
			if (parseInt(c) > 0) {
				numStart = x;
				while (x < width && !isNaN(parseInt(line[x]))) {
					x++;
				}
				if (findChar(map, numStart - 1, y - 1, x, y + 1)) {
					sum += parseInt(line.slice(numStart, x).join(''));
				}
			}
		}
	}
	return sum;
};
exports.first = partNumberSum;

export const gearRatiosSum = (s: string) => {
	const map = parse(s);
	const height = map.length;
	const width = map[0].length;
	let stars: { x: number; y: number; gears: number[] }[] = [];
	for (let y = 0; y < height; y++) {
		const line = map[y];
		for (let x = 0; x < width; x++) {
			const c = line[x];
			let numStart: number | null = null;
			if (parseInt(c) > 0) {
				numStart = x;
				while (x < width && !isNaN(parseInt(line[x]))) {
					x++;
				}
				let starLoc = findChar(
					map,
					numStart - 1,
					y - 1,
					x,
					y + 1,
					true
				);
				if (starLoc) {
					let star = stars.find(
						(star) => star.x === starLoc!.x && star.y === starLoc!.y
					);
					if (!star) {
						star = {
							x: starLoc.x,
							y: starLoc.y,
							gears: [parseInt(line.slice(numStart, x).join(''))],
						};
						stars.push(star);
					} else {
						star.gears.push(
							parseInt(line.slice(numStart, x).join(''))
						);
					}
				}
			}
		}
	}
	return stars
		.filter((star) => star.gears.length == 2)
		.reduce((sum, star) => sum + star.gears[0] * star.gears[1], 0);
};
exports.second = gearRatiosSum;
