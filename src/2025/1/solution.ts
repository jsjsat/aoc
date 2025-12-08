import { Solution } from "../../types"
import { parseLines, readInput } from "../../utils";

export default {
    compute(): string {
        return "1: " + this.compute1() + "\n2: " + this.compute2();
    },
    
    compute1(): string {
        const file = readInput(2025, 1);
        const lines = parseLines(file);
        let position = 50;
        let result = 0;
        for (const line of lines) {
            const direction = line[0];
            let value = parseInt(line.slice(1,line.length));
            if (direction === 'L') {
                position -= value;
            } else if (direction === 'R') {
                position += value;
            }

            position = ((position % 100) + 100) % 100; // wrap around 0-99
            if (position === 0) {
                result++;
            }

        }
        return ""+result;
    },

    compute2(): string {
        const file = readInput(2025, 1);
        const lines = parseLines(file);
        let position = 50;
        let result = 0;
        
        for (const line of lines) {
            const direction = line[0];
            const value = parseInt(line.slice(1));
            let oldPosition = position;
            
            // Count full loops (each complete circle passes 0)
            const loops = Math.floor(value / 100);
            if (loops > 0) {
                result += loops;
            }
            
            // Check if remaining movement crosses 0
            const remaining = value % 100;
            
            if (direction === 'R') {
                if (position + remaining > 100) {
                    result++; // Crossed 0
                }
                position = (position + remaining) % 100;
            } else { // 'L'
                if (position - remaining < 0 && position !== 0) {
                    result++; // Crossed 0
                }
                position = ((position - remaining) % 100 + 100) % 100;
            }
            
            // Count if we land on 0 if we didn't start there
            if (position === 0 && oldPosition !== 0 ) {
                result++;
            }
        }
        
        return "" + result;
    }
} satisfies Solution;
