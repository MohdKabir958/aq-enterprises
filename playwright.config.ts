import { defineConfig } from '@playwright/test';
import { scryptSync } from 'node:crypto';
if (!process.env.TEST_DATABASE_URL)
  throw new Error(
    'Set TEST_DATABASE_URL to a disposable PostgreSQL database whose name ends in _test.',
  );
const salt = '00000000000000000000000000000000';
export default defineConfig({
  testDir: './tests',
  testMatch: ['admin.spec.ts', 'notifications.spec.ts'],
  workers: 1,
  fullyParallel: false,
  timeout: 60000,
  use: {
    baseURL: 'http://127.0.0.1:3010',
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ['--no-sandbox'],
    },
  },
  webServer: {
    command:
      'node scripts/prepare-admin-test.mjs && npm run start -- --hostname 127.0.0.1 --port 3010',
    url: 'http://127.0.0.1:3010/admin',
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      DATABASE_URL: process.env.TEST_DATABASE_URL,
      ADMIN_EMAIL: 'owner@example.test',
      ADMIN_PASSWORD_HASH: `${salt}:${scryptSync('Test-password-only-123', salt, 64).toString('hex')}`,
      SMTP_USER: '',
      SMTP_PASS: '',
      LEAD_DESTINATION_EMAIL: '',
    },
  },
});
