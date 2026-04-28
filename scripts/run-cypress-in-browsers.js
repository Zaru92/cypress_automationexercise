const path = require('path');
const { spawnSync } = require('child_process');

const bundledBrowsers = ['electron'];

function printUsageAndExit(message) {
  if (message) {
    console.error(message);
  }

  console.error(
    'Usage: node scripts/run-cypress-in-browsers.js [--browsers chrome,firefox] [cypress args]',
  );
  process.exit(1);
}

function parseArgs(rawArgs) {
  let selectedBrowsers = process.env.CYPRESS_BROWSERS;
  const cypressArgs = [];

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === '--browsers') {
      selectedBrowsers = rawArgs[index + 1];
      index += 1;

      if (!selectedBrowsers) {
        printUsageAndExit('Missing value after --browsers.');
      }

      continue;
    }

    if (arg.startsWith('--browsers=')) {
      selectedBrowsers = arg.slice('--browsers='.length);
      continue;
    }

    if (arg === '--browser' || arg === '-b' || arg.startsWith('--browser=')) {
      printUsageAndExit('Use --browsers for multi-browser runs.');
    }

    cypressArgs.push(arg);
  }

  const browsers = selectedBrowsers
    ? parseBrowserList(selectedBrowsers)
    : detectAvailableBrowsers();

  if (browsers.length === 0) {
    printUsageAndExit('At least one browser must be provided.');
  }

  return { browsers, cypressArgs };
}

function parseBrowserList(browserList) {
  return browserList
    .split(',')
    .map((browser) => browser.trim())
    .filter(Boolean);
}

function detectAvailableBrowsers() {
  const result = spawnSync('npx', ['cypress', 'info'], {
    encoding: 'utf8',
    shell: false,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    console.warn('Unable to detect installed browsers with `cypress info`.');
    console.warn('Falling back to the bundled Cypress browser: electron.');

    return bundledBrowsers;
  }

  const detectedBrowsers = result.stdout
    .split('\n')
    .map((line) => line.match(/^\s*-\sName:\s(.+)\s*$/)?.[1])
    .filter(Boolean);

  return [...new Set([...detectedBrowsers, ...bundledBrowsers])];
}

function toReportSlug(browser) {
  return browser.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
}

const { browsers, cypressArgs } = parseArgs(process.argv.slice(2));
const results = [];

console.log(`Browsers selected for this run: ${browsers.join(', ')}`);

for (const browser of browsers) {
  const reportDir = path.posix.join('cypress/reports/mochawesome', toReportSlug(browser));

  console.log(`\n=== Running Cypress in ${browser} ===`);

  const result = spawnSync(
    'node',
    ['scripts/run-cypress-with-report.js', '--browser', browser, ...cypressArgs],
    {
      env: {
        ...process.env,
        CYPRESS_MOCHAWESOME_REPORT_DIR: reportDir,
      },
      shell: false,
      stdio: 'inherit',
    },
  );

  results.push({ browser, exitCode: result.status ?? 1 });
}

console.log('\nBrowser run summary:');

for (const { browser, exitCode } of results) {
  const status = exitCode === 0 ? 'passed' : `failed (${exitCode})`;
  console.log(`- ${browser}: ${status}`);
}

const firstFailure = results.find(({ exitCode }) => exitCode !== 0);
process.exit(firstFailure ? firstFailure.exitCode : 0);
