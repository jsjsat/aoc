import { Solution } from './types';

export default async function getSolution(
  year: string,
  day: string
): Promise<Solution | undefined> {
  try {
    // Validate the year
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum) || yearNum < 2015 || yearNum > 2100) {
      return undefined;
    }

    // Validate the day number
    const dayNum = parseInt(day, 10);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
      return undefined;
    }

    // Dynamically import the solution
    const module = await import(`./${year}/${day}/solution`);

    return module.default as Solution;
  } catch (error) {
    console.error(`Error loading solution for year ${year}, day ${day}:`, error);
    return undefined;
  }
}
