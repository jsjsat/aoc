# 🎄 Advent of Code 2024

```
    ✨
   /o\
  /o o\
 /o o o\
/o o o o\
    | |
```

TypeScript solution server for [Advent of Code 2024](https://adventofcode.com/2024).

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`. Access solutions: `http://localhost:3000/1`, `http://localhost:3000/2`, etc.

## ❄️ Adding a New Day

1. Create `src/{day}/` folder
2. Add `input.txt` and `solution.ts`:

```typescript
import { Solution } from "../solution"
import { readFileSync } from 'fs';

export const solution{day} : Solution = {
    compute(): string {
        return "1: " + this.compute1() + "\n2: " + this.compute2();
    },
    compute1(): string {
        const file = readFileSync('./src/{day}/input.txt', 'utf-8');
        // Part 1 solution
        return "result";
    },
    compute2(): string {
        const file = readFileSync('./src/{day}/input.txt', 'utf-8');
        // Part 2 solution
        return "result";
    }
}
```

That's it! Dynamic loading handles the rest. 🎉

## 📜 Commands

- `npm run dev` - Development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled code

---

⭐ **25 days, 50 stars!** ⭐
