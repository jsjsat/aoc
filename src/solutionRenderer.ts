export class SolutionRenderer {
  renderIndex(solutions: { year: number; day: number }[]): string {
    // Sort by year (descending) then by day (ascending)
    const sorted = solutions.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return a.day - b.day;
    });

    // Group by year
    const byYear = sorted.reduce(
      (acc, sol) => {
        if (!acc[sol.year]) acc[sol.year] = [];
        acc[sol.year].push(sol.day);
        return acc;
      },
      {} as Record<number, number[]>
    );

    const yearSections = Object.entries(byYear)
      .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
      .map(([year, days]) => {
        const dayLinks = days
          .map(day => `<a href="/${year}/${day}" class="day-link">Day ${day}</a>`)
          .join('');
        return `
          <div class="year-section">
            <h2 class="year-title">🎄 ${year} 🎄</h2>
            <div class="day-grid">${dayLinks}</div>
          </div>
        `;
      })
      .join('');

    const totalSolved = solutions.length;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Advent of Code Solutions</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎄</text></svg>">
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <canvas id="snowCanvas"></canvas>
      <div class="container">
        <div class="tree">🎄</div>
        <h1>Advent of Code Solutions</h1>
        ${yearSections}
        <div class="tree">🎄</div>
        <div class="footer">Made by <a href="https://github.com/jsjsat/aoc" target="_blank">js</a></div>
      </div>
      <script>
        const canvas = document.getElementById('snowCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const solvedDays = ${totalSolved};
        const snowflakeCount = Math.min(solvedDays * 5, 200); // 5 per day, max 200
        const snowflakes = [];

        class Snowflake {
          constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
          }

          reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.drift = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6 + 0.4;
          }

          update() {
            this.y += this.speed;
            this.x += this.drift;

            if (this.y > canvas.height) {
              this.reset();
            }

            if (this.x > canvas.width || this.x < 0) {
              this.x = Math.random() * canvas.width;
            }
          }

          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
            ctx.fill();
          }
        }

        for (let i = 0; i < snowflakeCount; i++) {
          snowflakes.push(new Snowflake());
        }

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
          });
          requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      </script>
    </body>
    </html>
  `;
  }

  render(year: string, day: string, part1: string, part2: string): string {
    const dayNum = parseInt(day);
    const snowflakeCount = Math.min(dayNum * 5, 200);

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AoC ${year} Day ${day}</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎄</text></svg>">
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <canvas id="snowCanvas"></canvas>
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
      <script>
        const canvas = document.getElementById('snowCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const snowflakeCount = ${snowflakeCount};
        const snowflakes = [];

        class Snowflake {
          constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
          }

          reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.drift = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6 + 0.4;
          }

          update() {
            this.y += this.speed;
            this.x += this.drift;

            if (this.y > canvas.height) {
              this.reset();
            }

            if (this.x > canvas.width || this.x < 0) {
              this.x = Math.random() * canvas.width;
            }
          }

          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
            ctx.fill();
          }
        }

        for (let i = 0; i < snowflakeCount; i++) {
          snowflakes.push(new Snowflake());
        }

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
          });
          requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      </script>
    </body>
    </html>
  `;
  }

  renderNotFound(year: string, day: string): string {
    return `<p style='font-family:monospace'>Solution not found for year ${year}, day ${day}</p>`;
  }
}
