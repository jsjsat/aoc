import { Solution } from "../../solution"
import { readInput } from "../../utils";

export const solution1 : Solution = {
    compute(): string {
        return "1: " + this.compute1() + "\n2: " + this.compute2();
    },
    
    compute1(): string {
        const file = readInput(2025, 1);
        // TODO: Implement Part 1 solution
        return "Not implemented yet";
    },

    compute2(): string {
        const file = readInput(2025, 1);
        // TODO: Implement Part 2 solution
        return "Not implemented yet";
    }
}
