# playwright-testing

A small, opinionated starter for Playwright end-to-end tests. This repo contains a minimal structure and commands to write, run, and report Playwright tests for web applications.

## Features
- Lightweight test structure using Playwright Test
- Example test(s) and config-ready structure
- Quick start commands to run tests and open reports

## Prerequisites
- Node.js 16+ (or the version supported by your Playwright)
- npm or yarn

## Quick start
1. Clone the repo
   ```
   git clone https://github.com/JordanLarcher/playwright-testing.git
   cd playwright-testing
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Install Playwright browsers (required once)
   ```
   npx playwright install
   ```

4. Run tests
   ```
   npx playwright test
   ```

5. Open the HTML report after a run
   ```
   npx playwright show-report
   ```

## Typical scripts (package.json)
Add or use these scripts in package.json:
```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:report": "npx playwright show-report",
    "test:debug": "npx playwright test --debug"
  }
}
```

## Project layout
- tests/ or e2e/ — your test files (e.g., example.spec.ts)
- playwright.config.ts — Playwright configuration (browsers, timeouts, projects)
- package.json — dependencies and scripts

## Example test
```ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
```

## Writing tests & tips
- Keep tests independent and idempotent.
- Use test fixtures in playwright.config.ts for common setup.
- Use `--headed` and `--trace` when debugging failures:
  ```
  npx playwright test --headed --trace on
  ```

## CI
- Use `npx playwright install --with-deps` in CI to ensure browser dependencies.
- Run `npx playwright test --reporter=list` or generate HTML reports and upload artifacts.

## Contributing
Contributions welcome — open an issue or PR with small, focused changes. Add tests for any new behaviour.

## License
MIT
