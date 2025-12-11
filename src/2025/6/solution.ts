import { readInput, parseLines } from "../../utils";

const input = readInput(2025, 6);

const solution = {
  compute1(): string {
    const lines = parseLines(input);
    let result = 0;
    const nums = lines.slice(0, lines.length - 1).map(line => line.trim().replace(/\s+/g, ' ').split(" ").map(Number)); 
    const ops = lines[lines.length - 1].split(" ").filter(op => op === '+' || op === '*');
    
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === '+') {
            result += nums.map(arr => arr[i]).reduce((acc, val) => acc + val, 0);
        } else {
            result += nums.map(arr => arr[i]).reduce((acc, val) => acc * val, 1);
        }
    }

    return result.toString();
  },

  compute2(): string {
    let result = 0;
    const lines = parseLines(input);
    const nums = normalizeStrings(lines.slice(0, lines.length - 1)).map(line => line.split(" ").map(num => num.padStart(4, '0'))); 
    const ops = lines[lines.length - 1].split(" ").filter(op => op === '+' || op === '*');
    
    for (let i = 0; i < ops.length; i++) {
        let num0 = Number((nums[0][i][0] != "0" ? nums[0][i][0]: "") + (nums[1][i][0] != "0" ? nums[1][i][0] : "") + (nums[2][i][0] != "0" ? nums[2][i][0] : "") + (nums[3][i][0] != "0" ? nums[3][i][0] : ""));
        let num1 = Number((nums[0][i][1] != "0" ? nums[0][i][1] : "") + (nums[1][i][1] != "0" ? nums[1][i][1] : "") + (nums[2][i][1] != "0" ? nums[2][i][1] : "") + (nums[3][i][1] != "0" ? nums[3][i][1] : ""));
        let num2 = Number((nums[0][i][2] != "0" ? nums[0][i][2] : "") + (nums[1][i][2] != "0" ? nums[1][i][2] : "") + (nums[2][i][2] != "0" ? nums[2][i][2] : "") + (nums[3][i][2] != "0" ? nums[3][i][2] : ""));
        let num3 = Number((nums[0][i][3] != "0" ? nums[0][i][3] : "") + (nums[1][i][3] != "0" ? nums[1][i][3] : "") + (nums[2][i][3] != "0" ? nums[2][i][3] : "") + (nums[3][i][3] != "0" ? nums[3][i][3] : ""));

        if (ops[i] === '+') {
            result += num0 + num1 + num2 + num3;
        } else {
            result += ((num0 === 0 ? 1 : num0) * (num1 === 0 ? 1 : num1) * (num2 === 0 ? 1 : num2) * (num3 === 0 ? 1 : num3));
        }
    }


    return result.toString();
  },
};

export default solution;

function normalizeStrings(strings: string[]): string[] {
  if (strings.length === 0) return strings;
  
  // Find the maximum length
  const maxLength = Math.max(...strings.map(s => s.length));
  
  return strings.map(str => {
    let result = '';
    for (let i = 0; i < maxLength; i++) {
      const currentChar = i < str.length ? str[i] : ' ';
      
      // Check if ANY other string has a non-space character at this position
      const hasNonSpaceAtPosition = strings.some(s => i < s.length && s[i] !== ' ');
      
      if (currentChar === ' ' && hasNonSpaceAtPosition) {
        result += '0';
      } else {
        result += currentChar;
      }
    }
    return result;
  });
}

