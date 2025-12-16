import { readInput, parseLines } from '../../utils';

const input = readInput(2025, 3);

const solution = {
  compute1(): string {
    const lines = parseLines(input);
    let result = 0;

    for (const line of lines) {
      const maxLeft = findMaxDigit(line.slice(0, -1));
      const indexOfMax = line.indexOf(maxLeft.toString());
      const maxRight = findMaxDigit(line.slice(indexOfMax + 1));
      result += maxLeft * 10 + maxRight;
    }

    return result.toString();
  },

  compute2(): string {
    const lines = parseLines(input);
    let result = 0;

    for (let line of lines) {
      let num = '';

      for (let x = 12; x > 0; x--) {
        const nextMax = findMaxDigit(line.slice(0, line.length - x + 1));
        num += nextMax;
        const indexOfMax = line.indexOf(nextMax.toString());
        line = line.slice(indexOfMax + 1);
      }

      result += parseInt(num);
    }

    return result.toString();
  },
};

function findMaxDigit(digits: string): number {
  return Math.max(...digits.split('').map(Number));
}

export default solution;
