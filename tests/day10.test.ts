import { findFurthestPoint, enclosedTiles } from '../src/day10';

const input1 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const input2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

test('day 10-1', () => {
	expect(findFurthestPoint(input1)).toBe(4);
	expect(findFurthestPoint(input2)).toBe(8);
});

const input3 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

test('day 10-2', () => {
	expect(enclosedTiles(input1)).toBe(1);
	expect(enclosedTiles(input3)).toBe(10);
});
