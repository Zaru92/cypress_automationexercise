const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = process.cwd();
const reportRoot = path.join(projectRoot, 'cypress', 'reports');
const defaultReportDir = path.join('cypress', 'reports', 'mochawesome');
const configuredReportDir = process.env.CYPRESS_MOCHAWESOME_REPORT_DIR || defaultReportDir;
const reportDir = path.resolve(projectRoot, configuredReportDir);
const reportJsonDir = path.join(reportDir, '.jsons');
const mergedReportPath = path.join(reportDir, 'merged.json');
const htmlReportDir = path.join(reportDir, 'html');

function runCommandAndReturnExitCode(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  return result.status ?? 1;
}

function assertReportDirIsSafe() {
  const relativeReportDir = path.relative(reportRoot, reportDir);

  if (relativeReportDir.startsWith('..') || path.isAbsolute(relativeReportDir)) {
    console.error(`Refusing to clean report directory outside ${reportRoot}: ${reportDir}`);
    process.exit(1);
  }
}

function cleanReportDir() {
  assertReportDirIsSafe();
  fs.rmSync(reportDir, { recursive: true, force: true });
  fs.mkdirSync(reportDir, { recursive: true });
}

function hasJsonReports() {
  return (
    fs.existsSync(reportJsonDir) &&
    fs.readdirSync(reportJsonDir).some((fileName) => fileName.endsWith('.json'))
  );
}

function buildHtmlReport() {
  const mergeResult = spawnSync('npx', ['mochawesome-merge', path.join(reportJsonDir, '*.json')], {
    encoding: 'utf8',
    shell: false,
    stdio: ['inherit', 'pipe', 'inherit'],
  });

  if (mergeResult.status !== 0) {
    return mergeResult.status ?? 1;
  }

  fs.writeFileSync(mergedReportPath, mergeResult.stdout);

  return runCommandAndReturnExitCode('npx', [
    'marge',
    mergedReportPath,
    '-f',
    'report',
    '-o',
    htmlReportDir,
  ]);
}

console.log(`Mochawesome report directory: ${path.relative(projectRoot, reportDir)}`);
cleanReportDir();

const cypressArgs = process.argv.slice(2);
const testExitCode = runCommandAndReturnExitCode('npx', ['cypress', 'run', ...cypressArgs]);

if (!hasJsonReports()) {
  console.warn('No JSON report files found. Skipping HTML report build.');
  process.exit(testExitCode);
}

const reportBuildExitCode = buildHtmlReport();
if (reportBuildExitCode !== 0) {
  process.exit(reportBuildExitCode);
}

process.exit(testExitCode);
