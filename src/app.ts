import express from 'express';
import { Solution } from './types';
import getSolution from './solutionLoader';
import { SolutionRenderer } from './solutionRenderer';
import { readdirSync, existsSync } from 'fs';
import path from 'path';

const app = express();
const renderer = new SolutionRenderer();

// Serve static CSS file
app.use('/styles.css', express.static(path.join(__dirname, 'styles.css')));

// Helper function to discover all solutions
function discoverSolutions(): { year: number; day: number }[] {
  const srcPath = path.join(__dirname);
  const solutions: { year: number; day: number }[] = [];

  // Look for year folders (2024, 2025, etc.)
  const entries = readdirSync(srcPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
      const year = parseInt(entry.name);
      const yearPath = path.join(srcPath, entry.name);
      const dayEntries = readdirSync(yearPath, { withFileTypes: true });

      for (const dayEntry of dayEntries) {
        if (dayEntry.isDirectory() && /^\d+$/.test(dayEntry.name)) {
          const day = parseInt(dayEntry.name);
          const solutionPath = path.join(yearPath, dayEntry.name, 'solution.ts');
          if (existsSync(solutionPath)) {
            solutions.push({ year, day });
          }
        }
      }
    }
  }

  return solutions;
}

// Index route
app.get('/', (req, res) => {
  const solutions = discoverSolutions();
  res.send(renderer.renderIndex(solutions));
});

// Route with year and day: /:year/:day
app.get('/:year/:day', async (req, res) => {
  const { year, day } = req.params;
  let solution = await getSolution(year, day);
  if (!solution) {
    res.status(404).send(renderer.renderNotFound(year, day));
    return;
  }
  const part1 = solution.compute1();
  const part2 = solution.compute2();
  res.send(renderer.render(year, day, part1, part2));
});

// Route with only day (defaults to current year 2025)
app.get('/:day', async (req, res) => {
  const day = req.params.day;
  const currentYear = new Date().getFullYear().toString();
  let solution = await getSolution(currentYear, day);
  if (!solution) {
    res.status(404).send(renderer.renderNotFound(currentYear, day));
    return;
  }
  const part1 = solution.compute1();
  const part2 = solution.compute2();
  res.send(renderer.render(currentYear, day, part1, part2));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
