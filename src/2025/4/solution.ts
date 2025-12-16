import { readInput, parseLines } from '../../utils';

const input = readInput(2025, 4);

const ROLL = '@';
const EMPTY = '#';

const solution = {
  compute1(): string {
    const lines = parseLines(input);
    let result = 0;

    for (let r = 0; r < lines.length; r++) {
      for (let c = 0; c < lines[0].length; c++) {
        if (lines[r][c] === ROLL) {
          const adjacentRolls = countAdjacentRolls(lines, r, c);
          if (adjacentRolls < 4) {
            result++;
          }
        }
      }
    }

    return result.toString();
  },

  compute2(): string {
    const lines = parseLines(input);
    let result = 0;
    let rollsRemoved = true;

    while (rollsRemoved) {
      rollsRemoved = false;

      for (let r = 0; r < lines.length; r++) {
        for (let c = 0; c < lines[0].length; c++) {
          if (lines[r][c] === ROLL) {
            const adjacentRolls = countAdjacentRolls(lines, r, c);
            if (adjacentRolls < 4) {
              lines[r] = lines[r].substring(0, c) + EMPTY + lines[r].substring(c + 1);
              result++;
              rollsRemoved = true;
            }
          }
        }
      }
    }

    return result.toString();
  },
};

function countAdjacentRolls(grid: string[], row: number, col: number): number {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  let count = 0;
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      if (grid[newRow][newCol] === ROLL) {
        count++;
      }
    }
  }

  return count;
}

export default solution;
