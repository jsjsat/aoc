import { parseLines, readInput } from '../../utils';

let result = 0;

function processBeamDownwards(
  beam: { x: number; y: number; value: number },
  lines: string[]
): { x: number; y: number; value: number }[] {
  let newBeams: { x: number; y: number; value: number }[] = [];
  const maxY = lines.length;
  const maxX = lines[0].length;
  const x = beam.x;
  const y = beam.y;
  const value = beam.value;

  if (maxY === y + 1) {
    return newBeams;
  }

  const next = lines[y + 1][x];

  if (next !== '^') {
    lines[y + 1] = lines[y + 1].substring(0, x) + value + lines[y + 1].substring(x + 1);
    newBeams.push({ x, y: y + 1, value });
    return newBeams;
  }

  let split = false;
  if (next === '^') {
    if (x - 1 >= 0) {
      const leftChar = lines[y + 1][x - 1];
      if (leftChar === '.') {
        lines[y + 1] = lines[y + 1].substring(0, x - 1) + value + lines[y + 1].substring(x);
        newBeams.push({ x: x - 1, y: y + 1, value });
        split = true;
      }
    }
    if (x + 1 < maxX) {
      const rightChar = lines[y + 1][x + 1];
      if (rightChar === '.') {
        lines[y + 1] = lines[y + 1].substring(0, x + 1) + value + lines[y + 1].substring(x + 2);
        newBeams.push({ x: x + 1, y: y + 1, value });
        split = true;
      }
    }

    if (split) {
      result++;
    }
  }

  return newBeams;
}

function processBeamsUpwards(lines: string[]): string {
  const grid: number[][] = Array(lines.length)
    .fill(0)
    .map(() => Array(lines[0].length).fill(0));

  for (let x = 0; x < lines[0].length; x++) {
    const char = lines[lines.length - 1][x];
    if (char === '1') {
      grid[lines.length - 1][x] = 1;
    }
  }

  for (let y = lines.length - 2; y >= 0; y--) {
    for (let x = 0; x < lines[0].length; x++) {
      const char = lines[y][x];
      if (char !== '.' && char !== '^') {
        const belowChar = lines[y + 1][x];
        if (belowChar !== '^') {
          grid[y][x] = grid[y + 1][x];
        } else {
          const belowLeftChar = x - 1 >= 0 ? grid[y + 1][x - 1] : 0;
          const belowRightChar = x + 1 < lines[0].length ? grid[y + 1][x + 1] : 0;
          grid[y][x] = belowLeftChar + belowRightChar;
        }
      }
    }
  }

  return grid[0][lines[0].indexOf('S')].toString();
}

function compute1(): string {
  const input = readInput(2025, 7);
  const lines = parseLines(input);
  const x = lines[0].indexOf('S');
  const y = 0;
  result = 0;

  let beams = [{ x, y, value: 1 }];
  while (beams.length > 0) {
    const beam = beams.pop();
    if (beam) {
      const newBeams = processBeamDownwards(beam, lines);
      if (newBeams.length > 0) {
        beams.push(...newBeams);
      }
    }
  }

  return result.toString();
}

function compute2(): string {
  const input = readInput(2025, 7);
  const lines = parseLines(input);
  const x = lines[0].indexOf('S');
  const y = 0;

  let beams = [{ x, y, value: 1 }];
  while (beams.length > 0) {
    const beam = beams.pop();
    if (beam) {
      const newBeams = processBeamDownwards(beam, lines);
      if (newBeams.length > 0) {
        beams.push(...newBeams);
      }
    }
  }

  return processBeamsUpwards(lines);
}

export default { compute1, compute2 };
