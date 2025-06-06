import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ENV } from '../../../utils/environments';
import { loginTestScenarios } from '../../data/loginTestScenarios';

test.describe('Login Tests', () => {

  // Successful login test
  const validScenario = loginTestScenarios.find(scenario => scenario.tag === '@positive');
  
  if (!validScenario) {
    throw new Error('Positive login test scenario not found');
  }
  
  test('should successfully login with valid credentials', { tag: '@positive' },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await test.step('Opening login page', async () => {
        await loginPage.openLoginPage();  
      });
      await test.step('Enter valid credentials and click Login', async () => {
        await loginPage.performLogin(validScenario.username, validScenario.password);
      });
      await test.step('Verify successful login', async () => {
          await expect(page.locator('h6')).toHaveText('Dashboard');
      });
    });
  });

  // Negative login test scenarios
  for (const scenario of loginTestScenarios) {
    if (!scenario.expected.success) {
      test(`${scenario.caseId} - ${scenario.testCaseName}`, { tag: '@negative' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('Opening login page', async () => {
          await loginPage.openLoginPage();
        });
        await test.step('Enter invalid credentials', async () => {
          await loginPage.performLogin(scenario.username, scenario.password);
        });
        await test.step('Verify error message', async () => {
          if (scenario.username === ' ' && scenario.password === ' ') {
            await expect(page.locator(loginPage.passwordErrorMessage)).toBeVisible();
            await expect(page.locator(loginPage.usernameErrorMessage)).toBeVisible();
          } else {
            const errorSelector = scenario.expected.message === 'Required' ? 
              scenario.username === '' ? loginPage.usernameErrorMessage : loginPage.passwordErrorMessage :
              loginPage.errorAlert;
            await expect(page.locator(errorSelector)).toBeVisible();
            const errorMessage = await page.locator(errorSelector).textContent();
            await expect(errorMessage).toBe(scenario.expected.message);
          }
        });
      });
    }
  };

  test.afterEach(async ({ page }) => {
      try {
        // Navigate back to login page if we're not already there
        if (!page.url().includes('/auth/login')) {
          await test.step('Navigating back to login page for cleanup', async () => {
            await page.goto(ENV.baseUrl);
          });
        }
      } catch (error) {
        await test.step('Test cleanup failed', async () => {
          throw error;
        });
      }
    });