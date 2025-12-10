export class SolutionRenderer {
  renderIndex(solutions: { year: number; day: number }[]): string {
    // Sort by year (descending) then by day (ascending)
    const sorted = solutions.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return a.day - b.day;
    });

    // Group by year
    const byYear = sorted.reduce((acc, sol) => {
      if (!acc[sol.year]) acc[sol.year] = [];
      acc[sol.year].push(sol.day);
      return acc;
    }, {} as Record<number, number[]>);

    const yearSections = Object.entries(byYear)
      .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
      .map(([year, days]) => {
        const dayLinks = days
          .map(
            (day) =>
              `<a href="/${year}/${day}" class="day-link">Day ${day}</a>`
          )
          .join("");
        return `
          <div class="year-section">
            <h2 class="year-title">🎄 ${year} 🎄</h2>
            <div class="day-grid">${dayLinks}</div>
          </div>
        `;
      })
      .join("");

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Advent of Code Solutions</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
        <div class="tree">🎄</div>
        <h1>Advent of Code Solutions</h1>
        ${yearSections}
        <div class="tree">🎄</div>
        <div class="footer">Made by <a href="https://github.com/jsjsat/aoc" target="_blank">js</a></div>
      </div>
    </body>
    </html>
  `;
  }

  render(year: string, day: string, part1: string, part2: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AoC ${year} Day ${day}</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
      <h1>Advent of Code ${year} - Day ${day}</h1>
        <div class="solution-box">
          <div class="part-label"><span class="star">⭐</span>Part 1</div>
          <div class="result">${part1}</div>
        </div>
        <div class="solution-box">
          <div class="part-label"><span class="star">⭐⭐</span>Part 2</div>
          <div class="result">${part2}</div>
        </div>
        
        <div><a href="/" class="back-button">← Back to Index</a></div>
        <div class="tree">🎄</div>
        <div class="footer">
          Made by <a href="https://github.com/jsjsat/aoc" target="_blank">js</a></div>
      </div>
    </body>
    </html>
  `;
  }

  renderNotFound(year: string, day: string): string {
    return `<p style='font-family:monospace'>Solution not found for year ${year}, day ${day}</p>`;
  }
}
