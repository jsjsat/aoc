import getSolution from './solutionLoader';

describe('Solution Loader', () => {
    test('should load valid 2024 day 1 solution', async () => {
        const solution = await getSolution('2024', '1');
        expect(solution).toBeDefined();
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

    test('solution should return numeric results', async () => {
        const solution = await getSolution('2024', '1');
        const result1 = solution?.compute1();
        const result2 = solution?.compute2();
        expect(result1).toBeDefined();
        expect(result2).toBeDefined();
        expect(typeof result1).toBe('string');
        expect(typeof result2).toBe('string');
    });
});
