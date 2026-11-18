import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: process.env.TEST_URL || 'http://127.0.0.1:4173/haya-makeup-demo/', channel: 'chrome', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  reporter: [['list']],
})
