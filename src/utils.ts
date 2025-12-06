import { readFileSync } from 'fs';
import * as path from 'path';

/**
 * Read input file for a specific year and day
 */
export function readInput(year: number, day: number): string {
    return readFileSync(path.join(__dirname, `${year}/${day}/input.txt`), 'utf-8');
}

/**
 * Split input into lines and filter out empty lines
 */
export function parseLines(input: string): string[] {
    return input.split('\n').filter(line => line.trim() !== '');
}

/**
 * Parse input as array of numbers (one per line)
 */
export function parseNumbers(input: string): number[] {
    return parseLines(input).map(Number);
}

/**
 * Parse input as 2D grid of characters
 */
export function parseGrid(input: string): string[][] {
    return parseLines(input).map(line => line.split(''));
}

/**
 * Parse input as 2D grid of numbers
 */
export function parseNumberGrid(input: string): number[][] {
    return parseLines(input).map(line => line.split('').map(Number));
}

/**
 * Get all lines including empty ones
 */
export function getAllLines(input: string): string[] {
    return input.split('\n');
}
