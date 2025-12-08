import { Solution } from "../../types"
import { readInput } from "../../utils";

export default {
    compute1() {
        const file = readInput(2024, 2);
        const reports = file.split("\n").slice(0, -1).map(str => str.split(" ").map(Number));
        return "" + reports.filter(report => isValid1(report)).length;
    },

    compute2() {
        const file = readInput(2024, 2);
        const reports = file.split("\n").slice(0, -1).map(str => str.split(" ").map(Number));
        return "" + reports.filter(report => isValid2(report)).length;
    }
}

function isValid1(report: number[]): boolean {

    let asc = report[0] < report[1];

    for(let i = 1; i < report.length; i++) {
        let diff = Math.abs(report[i] - report[i-1]);
        if ((asc && report[i] < report[i-1]) || (!asc && report[i] > report[i-1])) {
            return false;
        }
        if (diff  <  1 || diff > 3) {
            return false;
        }
    }

    return true;
}

function isValid2(report: number[]): boolean {
    for(let i = 0; i < report.length; i++) {
        if(isValid1(report.filter((_,idx) => i !== idx))) {
            return true;
        }
    }

    return false;;
}
