import express from 'express';
import { Solution } from './types';
import getSolution from './solutionLoader';
import { SolutionRenderer } from './solutionRenderer';

const app = express();
const renderer = new SolutionRenderer();

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