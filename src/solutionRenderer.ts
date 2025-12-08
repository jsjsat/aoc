export class SolutionRenderer {
  render(year: string, day: string, part1: string, part2: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AoC ${year} Day ${day}</title>
      <style>
        body {
          font-family: 'Courier New', monospace;
          background: linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%);
          color: #e8f4f8;
          padding: 40px;
          margin: 0;
          min-height: 100vh;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          text-align: center;
          color: #ffd700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          margin-bottom: 40px;
          font-size: 2.5em;
        }
        .solution-box {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid #00ff88;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3), 0 0 20px rgba(0,255,136,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .solution-box:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 7px rgba(0,0,0,0.35), 0 0 25px rgba(0,255,136,0.25);
        }
        .part-label {
          color: #ff8c42;
          font-weight: 700;
          font-size: 1.3em;
          margin-bottom: 10px;
        }
        .result {
          color: #00ff88;
          font-size: 2em;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }
        .star {
          color: #ffd700;
          margin-right: 10px;
        }
        .tree {
          text-align: center;
          font-size: 2.5em;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          color: #ff8c42;
          font-weight: 700;
          font-size: 0.9em;
          margin-top: 10px;
        }
        .footer a {
          color: #ff8c42;
          text-decoration: underline;
        }
        .footer a:hover {
          text-decoration: none;
        }
      </style>
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
        <div class="tree">🎄</div>
        <div class="footer">Made by <a href="https://github.com/jsjsat/aoc" target="_blank">js</a></div>
      </div>
    </body>
    </html>
  `;
  }

  renderNotFound(year: string, day: string): string {
    return `<p style='font-family:monospace'>Solution not found for year ${year}, day ${day}</p>`;
  }
}
