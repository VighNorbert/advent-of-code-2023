const parse = (s: string) => s.trim().split('\n');

export const navigateStorm = (s: string) => {
	const instructions = parse(s)[0].split('');

	const rules = new Map<string, string[]>();

	parse(s)
		.slice(2)
		.forEach((rule) => {
			let [key, value] = rule.split(' = ');
			rules.set(key, value.replace('(', '').replace(')', '').split(', '));
		});

	let pos = 'AAA';
	let i = 0;
	while (true) {
		const instruction = instructions[i % instructions.length];
		const rule = rules.get(pos)!;
		pos = rule[instruction === 'R' ? 1 : 0];
		i++;
		if (pos === 'ZZZ') {
			return i;
		}
	}
};
exports.first = navigateStorm;

const lcm = (a: number, b: number) => {
	let max = Math.max(a, b);
	let min = Math.min(a, b);
	let i = 1;
	while (true) {
		if ((max * i) % min === 0) {
			return max * i;
		}
		i++;
	}
};

export const navigateStormWithGhosts = (s: string) => {
	const instructions = parse(s)[0].split('');

	const rules = new Map<string, string[]>();
	let positions = parse(s)
		.slice(2)
		.map((rule) => {
			let [key, value] = rule.split(' = ');
			rules.set(key, value.replace('(', '').replace(')', '').split(', '));
			return key;
		});

	return positions
		.filter((pos) => pos[2] === 'A')
		.map((pos) => {
			let i = 0;
			while (true) {
				const instruction = instructions[i % instructions.length];
				const rule = rules.get(pos)!;
				pos = rule[instruction === 'R' ? 1 : 0];
				i++;
				if (pos[2] === 'Z') {
					return i;
				}
			}
		})
		.reduce((a, b) => lcm(a, b), 1);
};
exports.second = navigateStormWithGhosts;
