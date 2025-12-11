import { readInput, parseLines } from "../../utils";

const input = readInput(2025, 5);

const solution = {
  compute1(): string {
    let result = 0;
    const lines = parseLines(input);
    const ranges = lines.filter(line => line.includes('-')).map(line => {
        const [start, end] = line.split('-').map(Number);
        return { start, end };
    });
    const ids = lines.filter(line => !line.includes('-')).map(line => Number(line));
    for (const id of ids) {
        let inRange = ranges.find(range => id >= range.start && id <= range.end);
        if (inRange) {
            result++;
        }
    }
    
    
    return result.toString();
  },

  compute2(): string {
    const lines = parseLines(input);
    const ranges = lines.filter(line => line.includes('-')).map(line => {
        const [start, end] = line.split('-').map(Number);
        return { start, end };
    });

    let newRanges = [...ranges];
    let merged = true;
    
    while (merged) {
      merged = false;
      for (let i = 0; i < newRanges.length - 1; i++) {
        for (let j = i + 1; j < newRanges.length; j++) {
          if (doRangesIntersect(newRanges[i], newRanges[j])) {
            const mergedRange = mergeRanges(newRanges[i], newRanges[j]);
            newRanges = [
              ...newRanges.slice(0, i),
              mergedRange,
              ...newRanges.slice(i + 1, j),
              ...newRanges.slice(j + 1)
            ];
            merged = true;
            break;
          }
        }
        if (merged) break;
      }
    }
    
    return getRangeTotal(newRanges).toString();
  },
}

function getRangeTotal(ranges: { start: number; end: number }[]): number {
    return ranges.reduce((acc, range) => acc + (range.end - range.start + 1), 0);
}


function isInRange(id: number, range: { start: number; end: number }): boolean {
    return id >= range.start && id <= range.end;
}

function doRangesIntersect(range1: { start: number; end: number }, range2: { start: number; end: number }): boolean {
    return isInRange(range1.start, range2) || isInRange(range1.end, range2) ||
           isInRange(range2.start, range1) || isInRange(range2.end, range1);
}


function mergeRanges(a: { start: number; end: number }, b: { start: number; end: number } ): { start: number; end: number } {
    const start = Math.min(a.start, b.start);
    const end = Math.max(a.end, b.end);
    return { start, end };  
}

export default solution;
