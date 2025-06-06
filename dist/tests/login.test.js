"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const loginTestData_1 = require("../data/loginTestData");
test_1.test.describe('Login Tests', () => {
    let loginPage;
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage_1.LoginPage(page);
        await loginPage.openLoginPage();
    });
    // Basic login tests
    (0, test_1.test)('should display login page correctly', async ({ page }) => {
        await loginPage.verifyLabels(page);
        await (0, test_1.expect)(page.locator(loginPage.usernameInput)).toBeVisible();
        await (0, test_1.expect)(page.locator(loginPage.passwordInput)).toBeVisible();
        await (0, test_1.expect)(page.locator(loginPage.loginButton)).toBeVisible();
    });
    (0, test_1.test)('should successfully login with valid credentials', async ({ page }) => {
        // Set longer timeout for this test
        test_1.test.setTimeout(10000);
        await loginPage.login(loginTestData_1.loginTestData.validCredentials.username, loginTestData_1.loginTestData.validCredentials.password);
        // Verify dashboard is loaded
        await (0, test_1.expect)(page.locator(loginPage.dashboardHeader)).toBeVisible();
        await (0, test_1.expect)(page.locator(loginPage.dashboardHeader)).toHaveText('Dashboard');
    });
});
