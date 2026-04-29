# Cypress Automation Exercise

## Introduction

This repository contains automated UI and API tests for
[Automation Exercise](https://automationexercise.com). The project is based on Cypress,
TypeScript, the Page Object Model, shared test flows, and Mochawesome report generation.

The goal of the project is to maintain readable, repeatable, and easy-to-extend regression,
smoke, and API tests.

## Components and Dependencies

Main project components:

- `cypress/e2e/ui` - end-to-end UI tests.
- `cypress/e2e/api` - API tests.
- `cypress/pageObjects` - Page Objects for application pages.
- `cypress/pageObjects/components` - components shared by multiple pages.
- `cypress/support/flows` - business flows reused across tests.
- `cypress/support/api` - helpers and assertions for API tests.
- `cypress/support/commands.ts` - custom Cypress commands, for example `cy.getByQa()` and
  `cy.logStep()`.
- `cypress/testData` - test data factories.
- `cypress.config.ts` - Cypress configuration, `baseUrl`, reporter, viewport, and Node tasks.
- `scripts` - scripts for running tests, tags, browsers, and reports.

Key dependencies:

- `cypress` - UI/API test runner.
- `typescript` - typing and test compilation.
- `cypress-mochawesome-reporter`, `mochawesome`, `mochawesome-merge`,
  `mochawesome-report-generator` - HTML/JSON reports.
- `eslint`, `@typescript-eslint/*`, `eslint-plugin-cypress`, `eslint-config-prettier` - static
  code analysis.
- `prettier` - code formatting.
- `husky`, `lint-staged` - quality checks before commits.

## Hardware Requirements

Minimum requirements:

- System: macOS, Linux, or Windows.
- CPU: 2 cores.
- RAM: 4 GB.
- Disk: at least 1 GB of free space for dependencies, reports, screenshots, and videos.
- Internet: access to `https://automationexercise.com` is required.

Recommended:

- CPU: 4 cores.
- RAM: 8 GB or more.
- Installed Chrome, Firefox, or Edge browser for cross-browser testing.
- Stable internet connection, because the tests use a public application.

## Getting Started

Environment setup for writing and running tests:

1. Install Git.
2. Install Node.js compatible with Cypress 15, preferably Node.js 22 LTS or Node.js 24.
3. Install npm, which is bundled with Node.js.
4. Optionally install Visual Studio Code with the ESLint and Prettier extensions.
5. Clone the repository:

```bash
git clone https://github.com/Zaru92/cypress_automationexercise.git
cd cypress_automationexercise
```

6. Install dependencies:

```bash
npm install
```

7. Verify the Cypress installation:

```bash
npx cypress verify
```

## How to Run Tests

Open Cypress in interactive mode:

```bash
npm run cy:open
```

Run all tests headlessly in Electron:

```bash
npm run cy:run
```

Run tests in a selected browser:

```bash
npm run cy:run:electron
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

Run the same test suite across multiple browsers:

```bash
npm run cy:run:browsers
```

Select a specific browser matrix:

```bash
npm run cy:run:browsers -- --browsers chrome,firefox
CYPRESS_BROWSERS=chrome,firefox npm run cy:run:browsers
```

Run tests by tags used in `describe` names:

```bash
npm run test:smoke
npm run test:regression
npm run test:api
```

Run a tag in all detected browsers:

```bash
npm run test:smoke:browsers
npm run test:regression:browsers
npm run test:api:browsers
```

Run a single spec file:

```bash
npm run cy:run -- --spec cypress/e2e/ui/TC2-validLoginTest.cy.ts
```

HTML reports are generated in:

- `cypress/reports/mochawesome/html` for single-browser runs.
- `cypress/reports/mochawesome/<browser>/html` for multi-browser runs.

## Links to Other Documentation

- [Cypress documentation](https://docs.cypress.io/)
- [Cypress configuration](https://docs.cypress.io/app/references/configuration)
- [Cypress best practices](https://docs.cypress.io/app/core-concepts/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint documentation](https://eslint.org/docs/latest/)
- [Prettier documentation](https://prettier.io/docs/)
- [Automation Exercise API list](https://automationexercise.com/api_list)
- [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)

## Test Repository Link

- [Test repository](https://github.com/Zaru92/cypress_automationexercise)

## Automated Tests CI Link

- [GitHub Actions - automated test CI](https://github.com/Zaru92/cypress_automationexercise/actions)

The repository currently contains `.github/CODEOWNERS`, but it does not contain a workflow file in
`.github/workflows`. After a workflow is added, all CI runs should be visible under the link above.

## Contact

- Repository owner/technical contact: `@codex` from `.github/CODEOWNERS`.
- Bug reports and change proposals:
  [GitHub Issues](https://github.com/Zaru92/cypress_automationexercise/issues).
- Pull Requests:
  [GitHub Pull Requests](https://github.com/Zaru92/cypress_automationexercise/pulls).

## Useful Additional Information for Creating Automated Tests

- Tests should be independent and should not rely on execution order.
- Create test data through factories in `cypress/testData`, for example `createRandomTestUser()`.
- Keep shared business scenarios in `cypress/support/flows`.
- Keep API helpers and shared API assertions in `cypress/support/api`.
- UI locators and interactions should be hidden inside Page Objects or components.
- Avoid fixed waits. The project enforces the `cypress/no-unnecessary-waiting` ESLint rule.
- Do not use `cy.pause()`, `cy.debug()`, or forced clicks with `force: true`.
- On failure, Cypress saves screenshots and videos according to `cypress.config.ts`.
- `baseUrl` is set to `https://automationexercise.com`, so use relative paths in tests, for
  example `cy.visit('/')`.

## Code Styling Rules

Before opening a Pull Request, run:

```bash
npm run format:check
npm run lint
```

Automatic formatting and lint fixing:

```bash
npm run format
npm run lint:fix
```

Project rules:

- Write code in TypeScript.
- Use `import type` for imports that are used only as types.
- Do not use `any`; the `@typescript-eslint/no-explicit-any` rule is set to `error`.
- Keep code formatted with Prettier.
- Do not commit generated reports, screenshots, videos, or downloaded files.
- Avoid keeping test logic directly in specs when it can be moved to a Page Object, flow, or
  helper.

## Test Naming

- Name UI tests using the `TC<number>-scenarioDescriptionTest.cy.ts` pattern, for example
  `TC2-validLoginTest.cy.ts`.
- Name API tests using the `API<number>-endpointDescriptionTest.cy.ts` pattern, for example
  `API1-getAllProductsTest.cy.ts`.
- `describe` should contain a tag and scenario number, for example
  `Smoke | TC2: Login with valid credentials`.
- Supported tags based on the current scripts are `Smoke`, `Regression`, and `API`.
- The `it` name should describe user or API behavior, for example
  `logs in with an existing user and deletes the account`.
- Keep test names and step messages in English, following the current repository style.

## Page Object Rules

- Each larger page should have its own class in `cypress/pageObjects`.
- Put reusable UI fragments in `cypress/pageObjects/components`.
- Name action methods with verbs, for example `goToProductsPage()`, `submitLogin()`, and
  `addToCart()`.
- Start assertion method names with `assert`, for example `assertLoaded()` and
  `assertLoggedInAs()`.
- Page Object methods should return `this` when it makes step chaining readable.
- A Page Object should receive data as arguments instead of creating it internally.
- Leave data creation to factories in `cypress/testData`.
- Move longer scenarios that span multiple pages to `cypress/support/flows`.
- Every important action or assertion should log a step with `cy.logStep()`.

## Locator Naming

- Prefer stable `data-qa` attributes and the `cy.getByQa()` helper.
- Name `data-qa` values descriptively and in `kebab-case`, for example `continue-button`.
- For form fields, use helpers from `cypress/pageObjects/components/FormControls.ts`, for example
  `fillQaField()`, `selectQaField()`, and `clickQaField()`.
- If the application does not provide `data-qa`, use the most stable selectors available: `href`,
  link text, role, label, or a stable `id`.
- Avoid selectors that depend on styling, such as dynamic CSS classes, deep DOM paths, and
  `nth-child` indexes.
- If you extract a selector into a class field, use a clear name with the `Selector` or `Locator`
  suffix, for example `cartLinkSelector`.

## Test Execution Logging

- Use `cy.logStep('Step description')` to log steps.
- Keep log messages short, specific, and in English.
- Log entry into page flows, key user actions, and important assertions.
- Do not log passwords, tokens, or other secrets.
- For data that identifies test entities, it is acceptable to log safe values, such as an email
  generated by a test user factory.

## Adding Test Data to Configuration

- Add generated scenario data in `cypress/testData/*Factory.ts`.
- Keep data shared by multiple tests as typed constants or data factories.
- Add environment-dependent data to `env` in `cypress.config.ts` or pass it through `CYPRESS_*`
  environment variables.
- Do not store secrets in tests, Page Objects, or committed configuration files.
- If you use `cypress.env.json` locally, make sure before committing that the file is not added to
  the repository.
- After adding a new data factory, add a data type and use it in tests and flows.

## Pull Request Checklist

- Code is formatted: `npm run format:check`.
- Lint passes locally: `npm run lint`.
- The correct test scope was run, for example `npm run test:smoke`, `npm run test:api`, or
  `npm run cy:run`.
- New tests have clear file names, `describe` names, and `it` names.
- New UI steps are in Page Objects or components, not directly in the spec.
- Shared scenarios are moved to `cypress/support/flows`.
- Test data is created through factories in `cypress/testData`.
- There is no `cy.only`, `it.only`, `describe.only`, `cy.pause()`, or `cy.debug()`.
- There are no fixed `cy.wait()` calls without justification.
- No secrets or files generated by tests were added.
- Mochawesome reports, screenshots, and videos were checked for failures.
- CI in [GitHub Actions](https://github.com/Zaru92/cypress_automationexercise/actions) is green or
  the reason for failure is known.

## CI Link Where Tests Run

- [GitHub Actions - test runs](https://github.com/Zaru92/cypress_automationexercise/actions)
