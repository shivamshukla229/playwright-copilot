# Playwright TypeScript Automation Framework

This project is a sample Playwright automation framework using TypeScript. It demonstrates parallel execution, cross-browser testing, screenshots on failure, exception handling, and utility wait methods. The sample site used is https://www.saucedemo.com/.

## Features
- TypeScript support
- Page Object Model
- Parallel and cross-browser execution
- Screenshots and video on failure
- Utility wait methods
- Exception handling

## Structure
- `pages/` - Page Object classes
- `tests/` - Test specs
- `utils/` - Utility functions (wait, etc.)
- `playwright.config.ts` - Playwright configuration

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run all tests in parallel:
   ```sh
   npx playwright test
   ```
3. View HTML report:
   ```sh
   npx playwright show-report
   ```

## Example Test
See `tests/login.spec.ts` for a sample login test using the Page Object Model.

---

Replace the sample test and page objects with your own application logic as needed.
