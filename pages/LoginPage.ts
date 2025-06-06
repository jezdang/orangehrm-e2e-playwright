import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { ENV } from '../utils/environments';

export class LoginPage extends BasePage {
  public usernameInput = 'input[name="username"]';
  public passwordInput = 'input[name="password"]';
  public loginButton = 'button[type="submit"]';
  public rememberMe = 'input[name="remember"]';
  public dashboardHeader = 'h6';
  public errorAlert = '.oxd-alert-content-text';
  public usernameErrorMessage = `div:has(${this.usernameInput}) .oxd-input-field-error-message`;
  public passwordErrorMessage = `div:has(${this.passwordInput}) .oxd-input-field-error-message`;
  public usernameLabel = 'label:has-text("Username")';
  public passwordLabel = 'label:has-text("Password")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Open the login page
   */
  async openLoginPage() {
    const timeout = 20000;
    await this.page.goto(ENV.baseUrl, {
      waitUntil: 'networkidle',
      timeout
    });

    // Wait for page to be fully loaded
    await this.page.waitForLoadState('networkidle', { timeout });
    
    // Verify page elements
    await expect(this.page).toHaveTitle(/OrangeHRM/, { timeout });
    await expect(this.page.locator(this.usernameInput)).toBeVisible({ timeout });
    await expect(this.page.locator(this.passwordInput)).toBeVisible({ timeout });
    await expect(this.page.locator(this.loginButton)).toBeVisible({ timeout });
  }

  async performLogin(username: string, password: string, rememberMe = false) {
    const timeout = 10000;
    try {
      await this.page.waitForSelector(this.usernameInput, { timeout });
      await this.page.waitForSelector(this.passwordInput, { timeout });
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      
      if (rememberMe) {
        await this.page.waitForSelector(this.rememberMe, { timeout });
        await this.page.check(this.rememberMe);
      }
      
      await this.page.waitForSelector(this.loginButton, { timeout });
      await this.page.click(this.loginButton);
    } catch (error) {
      throw error;
    }
  }

  async loginToDashboard(username: string, password: string, rememberMe = false) {
    const timeout = 10000;
    await this.performLogin(username, password, rememberMe);
    
    await this.page.waitForSelector(this.dashboardHeader, { timeout });
    await expect(this.page.locator(this.dashboardHeader)).toBeVisible();
  }

  async clearCredentials() {
    await this.page.fill(this.usernameInput, '');
    await this.page.fill(this.passwordInput, '');
  }

  async verifyRememberMeState(checked: boolean) {
    await expect(this.page.locator(this.rememberMe)).toBeChecked({ checked });
  }
  async verifyLabels(page: Page) {
    await expect(page.locator(this.usernameLabel)).toBeVisible();
    await expect(page.locator(this.passwordLabel)).toBeVisible();
  }

  async getGeneralErrorMessage(): Promise<string> {
    const error = await this.page.locator(this.errorAlert);
    return await error.textContent() || '';
  }

  async getErrorUsernameMessage(): Promise<string> {
    const error = this.page.locator(this.usernameErrorMessage);
    return await error.textContent() || '';
  }

  async getErrorPasswordMessage(): Promise<string> {
    const error = await this.page.locator(this.passwordErrorMessage);
    return await error.textContent() || '';
  }
}
