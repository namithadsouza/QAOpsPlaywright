import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests', 
  timeout: 30 * 1000,
  expect:{
    // Expect a assertion to be met within 5 seconds
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    //Use chromium browser for testing
    browserName: 'chromium',
    //Run tests in headed mode(UI mode)
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',  
    trace: 'retain-on-failure',
  },
});

