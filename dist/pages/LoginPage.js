"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
const environments_1 = require("../utils/environments");
class LoginPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = 'input[name="username"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
        this.dashboardHeader = 'h6';
        this.passwordToggle = 'button[type="password"] ~ button';
        this.errorAlert = '.oxd-alert-content-text';
        this.rememberMe = 'input[name="remember"]';
        this.usernameLabel = 'label:has-text("Username")';
        this.passwordLabel = 'label:has-text("Password")';
    }
    async openLoginPage() {
        await this.navigate(environments_1.ENV.baseUrl);
        await (0, test_1.expect)(this.page).toHaveTitle(/OrangeHRM/);
        await (0, test_1.expect)(this.page.locator(this.usernameInput)).toBeVisible();
        await (0, test_1.expect)(this.page.locator(this.passwordInput)).toBeVisible();
        await (0, test_1.expect)(this.page.locator(this.loginButton)).toBeVisible();
    }
    async login(username, password, rememberMe = false) {
        // Add explicit timeout for waiting
        const timeout = 5000;
        // Wait for inputs to be visible and enabled
        await this.page.waitForSelector(this.usernameInput, { timeout });
        await this.page.waitForSelector(this.passwordInput, { timeout });
        // Type credentials
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        // Handle remember me if needed
        if (rememberMe) {
            await this.page.waitForSelector(this.rememberMe, { timeout });
            await this.page.check(this.rememberMe);
        }
        // Click login button
        await this.page.waitForSelector(this.loginButton, { timeout });
        await this.page.click(this.loginButton);
        // Wait for navigation to complete with explicit timeout
        await this.page.waitForNavigation({
            waitUntil: 'networkidle',
            timeout
        });
        // Verify login was successful
        await this.page.waitForSelector(this.dashboardHeader, { timeout });
    }
    async clearCredentials() {
        await this.page.fill(this.usernameInput, '');
        await this.page.fill(this.passwordInput, '');
    }
    async loginDefault() {
        await this.login(environments_1.ENV.credentials.username, environments_1.ENV.credentials.password);
    }
    async verifyDashboard() {
        await (0, test_1.expect)(this.page.locator(this.dashboardHeader)).toHaveText('Dashboard');
    }
    async verifyError(message) {
        await (0, test_1.expect)(this.page.locator(this.errorAlert)).toContainText(message);
    }
    async togglePasswordVisibility() {
        await this.page.click(this.passwordToggle);
        await (0, test_1.expect)(this.page.locator('input[type="text"]').first()).toBeVisible();
    }
    async verifyRememberMeState(checked) {
        await (0, test_1.expect)(this.page.locator(this.rememberMe)).toBeChecked({ checked });
    }
    async verifyLabels(page) {
        await (0, test_1.expect)(page.locator(this.usernameLabel)).toBeVisible();
        await (0, test_1.expect)(page.locator(this.passwordLabel)).toBeVisible();
    }
}
exports.LoginPage = LoginPage;
