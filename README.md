# 🎄 Advent of Code Solutions

```
          \|/
         --*--
          /|\
          >o<
         >@>O<
        >o>O>o<
       >@>o>@>O<
      >O>o>@>o>O<
     >o>@>O>o>@>o<
          | |
          | |
```

TypeScript solution server for [Advent of Code](https://adventofcode.com). Supports multiple years!

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`

## 🌟 Routes

- `http://localhost:3000/:day` - Current year (defaults to 2025)
- `http://localhost:3000/:year/:day` - Specific year and day

**Examples:**
- `http://localhost:3000/1` → Current year, Day 1
- `http://localhost:3000/2024/1` → 2024, Day 1
- `http://localhost:3000/2025/5` → 2025, Day 5

## ❄️ Adding a New Day

1. Create `src/{year}/{day}/` folder
2. Add `input.txt` and `solution.ts`:

```typescript
import { Solution } from "../../types"
import { readInput } from "../../utils";

export default {
    compute(): string {
        return "1: " + this.compute1() + "\n2: " + this.compute2();
    },
    compute1(): string {
        const file = readInput({year}, {day});
        // Part 1 solution
        return "result";
    },
    compute2(): string {
        const file = readInput({year}, {day});
        // Part 2 solution
        return "result";
    }
} satisfies Solution;
```

That's it! Dynamic loading handles the rest. 🎉

## 📜 Commands

- `npm run dev` - Development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled code
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

---

⭐ **25 days, 50 stars!** ⭐
