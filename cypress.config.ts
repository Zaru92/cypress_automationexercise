import { defineConfig } from 'cypress';
import fs from 'fs';

const reportDir = process.env.CYPRESS_MOCHAWESOME_REPORT_DIR ?? 'cypress/reports/mochawesome';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        deleteFileIfExists(path: string) {
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          return null;
        },
      });
    },
    baseUrl: 'https://automationexercise.com',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir,
      overwrite: false,
      html: true,
      json: true,
    },
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
