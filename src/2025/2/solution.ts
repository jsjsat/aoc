import { readInput, parseLines } from "../../utils";

const input = readInput(2025, 2);

function splitDigitsEvenly(num: string, chunkSize: number): string[] {
  const str = num.toString();
  const parts: string[] = [];
  
  for (let i = 0; i + chunkSize <= str.length; i += chunkSize) {
    parts.push(str.slice(i, i + chunkSize));
  }

  return parts;
}



function isRepeatedPattern(num: string, chunkSize: number): boolean {
    if (num.length % chunkSize !== 0) {
        return false;
    } 
    const digitGroups = splitDigitsEvenly(num, chunkSize);
    return digitGroups.every((val) => val === digitGroups[0]);
}

const solution = {
  compute1(): string {
    const lines = parseLines(input);
    let result = 0;
    
    const ranges = lines[0].split(",").map(range => range.split("-").map(Number));
    for(const range of ranges) {
        const [start, end] = range;
        for(let num = start; num <= end; num++) {
            if (num.toString().length % 2 !== 0) {
                continue;
            }
            if(isRepeatedPattern(num.toString(), Math.floor(num.toString().length / 2))) {
                result+=num;
            }
        }
    }
    
    return result.toString();
  },

  compute2(): string {
    const lines = parseLines(input);
    let result = 0;
    
    const ranges = lines[0].split(",").map(range => range.split("-").map(Number));

    for(const range of ranges) {
        const [start, end] = range;
        for(let num = start; num <= end; num++) {
            for(let chunkSize = 1; chunkSize <= Math.floor(num.toString().length / 2); chunkSize++) {
                if(isRepeatedPattern(num.toString(), chunkSize)) {
                    result+=num;
                    break;
                }
            }
        }
    }
    
    return result.toString();
},

  
};

export default solution;
