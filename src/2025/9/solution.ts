import { parseLines, readInput } from '../../utils';

interface Point2D {
  x: number;
  y: number;
}

function compute1(): string {
  const input = readInput(2025, 9);
  const lines = parseLines(input);
  const points = lines
    .map(line => line.split(',').map(Number))
    .map(([x, y]) => ({ x, y }) as Point2D);

  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const pointB = points[j];
      const area = Math.abs(pointA.x - pointB.x + 1) * Math.abs(pointA.y - pointB.y + 1);
      maxArea = Math.max(maxArea, area);
    }
  }
  
  return maxArea.toString();
}

function compute2(): string {
  // TODO: Implement part 2
  return '';
}

export default { compute1, compute2 };
