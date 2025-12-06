import { Solution } from "./solution";
import * as path from "path";
import * as fs from "fs";

export default async function getSolution(id: string): Promise<Solution | undefined> {
    try {
        // Validate the day number
        const dayNum = parseInt(id, 10);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
            return undefined;
        }

        // Check if the solution folder exists (check for .ts in dev, .js in prod)
        const tsPath = path.join(__dirname, id, 'solution.ts');
        const jsPath = path.join(__dirname, id, 'solution.js');
        
        if (!fs.existsSync(tsPath) && !fs.existsSync(jsPath)) {
            return undefined;
        }

        // Dynamically import the solution
        const module = await import(`./${id}/solution`);
        const solutionKey = `solution${id}`;
        
        return module[solutionKey] as Solution;
    } catch (error) {
        console.error(`Error loading solution for day ${id}:`, error);
        return undefined;
    }
}