import { parseLines, readInput } from '../../utils';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

function calculateDistance(p1: Point3D, p2: Point3D): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
}

function getClosestPairs(points: Point3D[]): { pair: [Point3D, Point3D]; distance: number }[] {
  const pairs: { pair: [Point3D, Point3D]; distance: number }[] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = calculateDistance(points[i], points[j]);
      pairs.push({ pair: [points[i], points[j]], distance });
    }
  }

  return pairs.sort((a, b) => a.distance - b.distance);
}

function compute1(): string {
  const input = readInput(2025, 8);
  const circuits: Point3D[][] = [];
  const points: Point3D[] = parseLines(input)
    .map(line => line.split(',').map(Number))
    .map(arr => ({ x: arr[0], y: arr[1], z: arr[2] }));

  const closestPair = getClosestPairs(points).slice(0, 1000);

  for (const { pair } of closestPair) {
    const a = pair[0];
    const b = pair[1];
    const ca = circuits.find(circuit => circuit.includes(a));
    const cb = circuits.find(circuit => circuit.includes(b));

    if (ca === undefined && cb === undefined) {
      circuits.push([a, b]);
    } else if (ca !== undefined && cb === undefined) {
      ca.push(b);
    } else if (ca === undefined && cb !== undefined) {
      cb.push(a);
    } else if (ca !== undefined && cb !== undefined && ca !== cb) {
      ca.push(...cb);
      circuits.splice(circuits.indexOf(cb), 1);
    }
  }

  circuits.sort((a, b) => b.length - a.length);
  const result = circuits[0].length * circuits[1].length * circuits[2].length;
  return result.toString();
}

function compute2(): string {
  const input = readInput(2025, 8);
  const circuits: Point3D[][] = [];
  const points: Point3D[] = parseLines(input)
    .map(line => line.split(',').map(Number))
    .map(arr => ({ x: arr[0], y: arr[1], z: arr[2] }));

  const closestPair = getClosestPairs(points);

  for (const { pair } of closestPair) {
    const a = pair[0];
    const b = pair[1];
    const ca = circuits.find(circuit => circuit.includes(a));
    const cb = circuits.find(circuit => circuit.includes(b));

    if (ca === undefined && cb === undefined) {
      circuits.push([a, b]);
    } else if (ca !== undefined && cb === undefined) {
      ca.push(b);
    } else if (ca === undefined && cb !== undefined) {
      cb.push(a);
    } else if (ca !== undefined && cb !== undefined && ca !== cb) {
      ca.push(...cb);
      circuits.splice(circuits.indexOf(cb), 1);
    }

    if (circuits.length === 1 && circuits[0].length === points.length) {
      return (a.x * b.x).toString();
    }
  }

  return '';
}

export default { compute1, compute2 };
