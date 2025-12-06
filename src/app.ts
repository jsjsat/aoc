import express from 'express';
import { Solution } from './types';
import getSolution from './solutionLoader';

const app = express();

// Route with year and day: /:year/:day
app.get('/:year/:day', async (req, res) => {
  const { year, day } = req.params;
  let solution = await getSolution(year, day);
  if (!solution) {
    res.status(404).send("<p style='font-family:monospace'>Solution not found for year " + year + ", day " + day + "</p>");
    return;
  }
  res.send("<p style='font-family:monospace'>" + solution.compute() + "</p>");
});

// Route with only day (defaults to current year 2025)
app.get('/:day', async (req, res) => {
  const day = req.params.day;
  const currentYear = new Date().getFullYear().toString();
  let solution = await getSolution(currentYear, day);
  if (!solution) {
    res.status(404).send("<p style='font-family:monospace'>Solution not found for day " + day + " (year " + currentYear + ")</p>");
    return;
  }
  res.send("<p style='font-family:monospace'>" + solution.compute() + "</p>");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});