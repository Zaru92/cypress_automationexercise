const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = process.cwd();
const reportJsonDir = path.join(projectRoot, 'cypress', 'reports', 'mochawesome', '.jsons');

function runCommandAndReturnExitCode(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
  });

  return result.status ?? 1;
}

const cleanExitCode = runCommandAndReturnExitCode('npm', ['run', 'report:clean']);
if (cleanExitCode !== 0) {
  process.exit(cleanExitCode);
}

const cypressArgs = process.argv.slice(2);
const testExitCode = runCommandAndReturnExitCode('npx', ['cypress', 'run', ...cypressArgs]);

const hasJsonReports =
  fs.existsSync(reportJsonDir) &&
  fs.readdirSync(reportJsonDir).some((fileName) => fileName.endsWith('.json'));

if (!hasJsonReports) {
  console.warn('No JSON report files found. Skipping HTML report build.');
  process.exit(testExitCode);
}

const reportBuildExitCode = runCommandAndReturnExitCode('npm', ['run', 'report:build']);
if (reportBuildExitCode !== 0) {
  process.exit(reportBuildExitCode);
}

process.exit(testExitCode);
