import getSolution from './solutionLoader';

describe('Solution Loader', () => {
    test('should load valid 2024 day 1 solution', async () => {
        const solution = await getSolution('2024', '1');
        expect(solution).toBeDefined();
        expect(solution?.compute).toBeDefined();
        expect(solution?.compute1).toBeDefined();
        expect(solution?.compute2).toBeDefined();
    });

    test('should load valid 2025 day 1 solution', async () => {
        const solution = await getSolution('2025', '1');
        expect(solution).toBeDefined();
    });

    test('should return undefined for invalid year', async () => {
        const solution = await getSolution('1999', '1');
        expect(solution).toBeUndefined();
    });

    test('should return undefined for day 0', async () => {
        const solution = await getSolution('2024', '0');
        expect(solution).toBeUndefined();
    });

    test('should return undefined for day 26', async () => {
        const solution = await getSolution('2024', '26');
        expect(solution).toBeUndefined();
    });

    test('should return undefined for non-existent solution', async () => {
        const solution = await getSolution('2024', '99');
        expect(solution).toBeUndefined();
    });

    test('solution output should contain part labels', async () => {
        const solution = await getSolution('2024', '1');
        const result = solution?.compute();
        expect(result).toContain('1:');
        expect(result).toContain('2:');
    });
});
