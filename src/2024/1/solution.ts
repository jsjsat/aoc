import { Solution } from "../../types"
import { readInput } from "../../utils";

export default {
    compute1() {
        const file = readInput(2024, 1);
        const arr = file.split("\n");
        const arrL = arr.map(line => +line.split("   ")[0]).sort((a,b) => b - a);
        const arrR = arr.map(line => +line.split("   ")[1]).sort((a,b) => b - a);
        let result = 0;
        for (let i = 0; i < arrL.length - 1; i++) {
            result += Math.abs(arrL[i] - arrR[i]);
        }
        return ""+result;
    },

    compute2() {
        const file = readInput(2024, 1);
        const arr = file.split("\n");
        const arrL = arr.map(line => +line.split("   ")[0]).sort((a,b) => b - a);
        const arrR = arr.map(line => +line.split("   ")[1]).sort((a,b) => b - a);
        const arrCounts = arrL.map(x => arrR.filter(y => x === y).length);
        let result = 0;
        for (let i = 0; i < arrL.length - 1; i++) {
            result += Math.abs(arrL[i] * arrCounts[i]);
        }
        return ""+result;
    }
}
