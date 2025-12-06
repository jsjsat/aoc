import express from 'express';
import { Solution } from './solution';
import getSolution from './solutionindex';

const app = express();

app.get('/:id', async (req, res) => {
  let id = req.params.id;
  let solution = await getSolution(id);
  if (!solution) {
    res.status(404).send("<p style='font-family:monospace'>Solution not found for day " + id + "</p>");
    return;
  }
  res.send("<p style='font-family:monospace'>" + solution.compute() + "</p>");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});