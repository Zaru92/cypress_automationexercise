const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const tag = process.argv[2];
const rawRunnerArgs = process.argv.slice(3);

if (!tag) {
  console.error(
    'Usage: node scripts/run-tagged-tests.js <TagName> [--all-browsers] [cypress args]',
  );
  process.exit(1);
}

const e2eDir = path.join(process.cwd(), 'cypress', 'e2e');
const specFilePattern = /\.cy\.(js|jsx|ts|tsx)$/;

function findSpecFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findSpecFiles(fullPath));
      continue;
    }

    if (entry.isFile() && specFilePattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

if (!fs.existsSync(e2eDir)) {
  console.error(`Directory not found: ${e2eDir}`);
  process.exit(1);
}

const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordBoundaryTag = new RegExp(`\\b${escapedTag}\\b`, 'i');

const matchingSpecPaths = findSpecFiles(e2eDir)
  .filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    return wordBoundaryTag.test(content);
  })
  .map((filePath) => path.relative(process.cwd(), filePath).replace(/\\/g, '/'));

if (matchingSpecPaths.length === 0) {
  console.error(`No spec files found for tag "${tag}".`);
  process.exit(1);
}

const runAcrossBrowsers = rawRunnerArgs.includes('--all-browsers');
const runnerArgs = rawRunnerArgs.filter((arg) => arg !== '--all-browsers');
const runnerScript = runAcrossBrowsers
  ? 'scripts/run-cypress-in-browsers.js'
  : 'scripts/run-cypress-with-report.js';

const result = spawnSync(
  'node',
  [runnerScript, '--spec', matchingSpecPaths.join(','), ...runnerArgs],
  {
    stdio: 'inherit',
    shell: false,
  },
);

process.exit(result.status || 0);
