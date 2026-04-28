# Cypress Automation Exercise

End-to-end test automation project using Cypress and TypeScript.

## Prerequisites

- Node.js 18+ (or current LTS)
- npm 9+

## Install Dependencies

```bash
npm install
```

## Run Cypress

Open Cypress interactive runner:

```bash
npm run cy:open
```

Run tests headlessly in all available browsers:

```bash
npm run cy:run
```

The default `cy:run` command detects locally installed Cypress-compatible browsers and also includes Cypress' bundled `electron` browser.

Run tests in a selected browser:

```bash
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
npm run cy:run:electron
```

Run the same suite across multiple browsers:

```bash
npm run cy:run:browsers
```

You can override the detected browser matrix:

```bash
npm run cy:run:browsers -- --browsers chrome,firefox
CYPRESS_BROWSERS=chrome,firefox npm run cy:run:browsers
```

Edge is supported by Cypress, but Microsoft Edge must be installed and detected on the machine:

```bash
npm run cy:run:browsers -- --browsers edge
```

Any Cypress CLI argument can still be passed through:

```bash
npm run cy:run:browsers -- --browsers chrome,firefox --spec cypress/e2e/ui/TC2-validLoginTest.cy.ts
npm run test:smoke -- --browser firefox
npm run test:smoke:browsers -- --browsers chrome,firefox
```

Single-browser reports are generated in `cypress/reports/mochawesome/html`. Multi-browser reports are generated per browser under `cypress/reports/mochawesome/<browser>/html`.

## Project Structure

- `cypress/e2e` - test specs
- `cypress/support` - shared commands and setup
- `cypress/fixtures` - test data
- `cypress.config.ts` - Cypress configuration

## Linting

```bash
npm run lint
```
