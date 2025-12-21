import { parseLines, readInput } from '../../utils';

// Convert array of bit indices to a number with those bits set
function indicesToBitmap(indices: number[]): number {
  return indices.reduce((acc, index) => acc | (1 << index), 0);
}

function compute1(): string {
  const input = readInput(2025, 10);
  const lines = parseLines(input);
  const lights = parseLights(lines);
  const buttongroups = parseButtonGroups(lines);
  let result = 0;

  for (let i = 0; i < lights.length; i++) {
    const light = lights[i];
    const buttongroup = buttongroups[i];
    result += solveLight(light, buttongroup);
  }

  return result.toString();
}

// BFS to find minimum button presses to reach target state
function solveLight(target: number, buttonGroup: number[]): number {
  const queue: Array<{ state: number; presses: number }> = [];
  const visited = new Set<number>();

  queue.push({ state: 0, presses: 0 });
  visited.add(0);

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.state === target) {
      return current.presses;
    }

    // Try pressing each button (XOR toggles bits)
    for (const button of buttonGroup) {
      const newState = current.state ^ button;

      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push({ state: newState, presses: current.presses + 1 });
      }
    }
  }
  return Infinity;
}

// Parse target light patterns as binary numbers
function parseLights(lines: string[]): number[] {
  const lights: number[] = [];
  for (const line of lines) {
    const end = line.indexOf(']');
    const num = parseInt(
      line
        .substring(1, end)
        .split('')
        .map(x => (x == '#' ? 1 : 0))
        .join(''),
      2
    );
    lights.push(num);
  }
  return lights;
}

// Parse button configurations as bitmaps (reversed indices)
function parseButtonGroups(lines: string[]): number[][] {
  const buttons: number[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const end = line.indexOf(']');
    const num = line.substring(1, end).split('').length;

    const button = line
      .split(' ')
      .slice(1, -1)
      .map(str =>
        str
          .slice(1, -1)
          .split(',')
          .map(numStr => parseInt(numStr, 10))
      )
      .map(indices => indicesToBitmap(indices.map(index => num - index - 1)));
    buttons.push(button);
  }

  return buttons;
}

function compute2(): string {
  const input = readInput(2025, 10);
  const lines = parseLines(input);

  return '';
}

export default { compute1, compute2 };
