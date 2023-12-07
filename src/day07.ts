const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(' '));

const evalHand = (hand: string, jokers: boolean = false) => {
	let cardCounts = new Map<string, number>();
	hand.split('').forEach((c) => {
		if (cardCounts.has(c)) {
			cardCounts.set(c, cardCounts.get(c)! + 1);
		} else {
			cardCounts.set(c, 1);
		}
	});

	const hash = hand
		.split('')
		.map((c) => {
			switch (c) {
				case 'A':
					return 14;
				case 'K':
					return 13;
				case 'Q':
					return 12;
				case 'J':
					return jokers ? 1 : 11;
				case 'T':
					return 10;
				default:
					return parseInt(c);
			}
		})
		.reduce((a, b) => a * 20 + b, 0);

	let maxCount = Array.from(cardCounts.keys())
		.filter((c) => !jokers || c !== 'J')
		.map((c) => cardCounts.get(c)!)
		.reduce((a, b) => (a > b ? a : b), 0);

	if (jokers && cardCounts.has('J')) {
		let nmc = maxCount + cardCounts.get('J')!;
		const i = Array.from(cardCounts.keys()).find(
			(v) => cardCounts.get(v) === maxCount
		)!;
		cardCounts.set(i, nmc);
		maxCount = nmc;
		cardCounts.delete('J');
	}

	if (maxCount > 3) {
		return { score: maxCount + 3, hash: hash, bid: 0 };
	}
	if (maxCount === 3) {
		return {
			score: Array.from(cardCounts.values()).includes(2) ? 5 : 4,
			hash: hash,
			bid: 0,
		};
	}
	if (maxCount === 2) {
		if (
			Array.from(cardCounts.values()).filter((v) => v === 2).length == 2
		) {
			return { score: 3, hash: hash, bid: 0 };
		}
	}
	return { score: maxCount, hash: hash, bid: 0 };
};

export const countScores = (s: string, jokers: boolean = false) => {
	const hands = parse(s);

	return hands
		.map((hand) => {
			let h = evalHand(hand[0], jokers);
			h.bid = parseInt(hand[1]);
			return h;
		})
		.sort((a, b) => {
			if (a.score === b.score) {
				return a.hash - b.hash;
			}
			return a.score - b.score;
		})
		.map((h, index) => {
			h.score = index + 1;
			return h;
		})
		.reduce((a, b) => a + b.bid * b.score, 0);
};
exports.first = countScores;

export const countScoresWithJokers = (s: string) => {
	return countScores(s, true);
};
exports.second = countScoresWithJokers;
