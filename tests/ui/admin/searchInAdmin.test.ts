import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { MenuPage } from '../../../pages/MenuPage';
import { AdminPage } from '../../../pages/AdminPage';
import { ENV } from '../../../utils/environments';
import { adminSearchScenarios } from '../../data/adminSearchScenarios';

let loginPage: LoginPage;
let menuPage: MenuPage;
let adminPage: AdminPage;

// Setup before each test
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  menuPage = new MenuPage(page);
  adminPage = new AdminPage(page);

  await loginPage.openLoginPage();
  await loginPage.loginToDashboard(ENV.credentials.username, ENV.credentials.password, false);
});

test.describe('Admin Search Tests', () => {
  for (const scenario of adminSearchScenarios) {
    test(`${scenario.caseId} - ${scenario.testCaseName}`, { tag: scenario.tag }, async ({ page }) => {
      await test.step('Navigating to admin menu', async () => {
        await menuPage.goToAdmin();
      });

      await test.step('Searching for user', async () => {
        await adminPage.searchBy(scenario.searchfield, scenario.value);
      });
        
      await test.step('Verifying search results', async () => {
        if (scenario.expectResults) {
          await adminPage.verifyUsernameExists(scenario.value);
        } else {
          const noRecords = adminPage.getNoRecordFoundMessage();
          await expect(noRecords).toBeVisible();
        }
      });
    });
  }
});
