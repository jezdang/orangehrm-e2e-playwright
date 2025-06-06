import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
  private pimMenuText = 'PIM';
  private employeeListMenu = 'text=Employee List';
  private resultTableBody = 'div.oxd-table-body';
  private searchButton = 'button:has-text("Search")';
  private mainMenuLocator = 'ul.oxd-main-menu';
  private adminMenuLocator = 'a[href*="viewAdminModule"]';

  constructor(page: Page) {
    super(page);
  }

  async goToAdmin() {
    const timeout = 30000; // Standard timeout
    
    // First, ensure we're on the dashboard
    await this.page.waitForURL(/dashboard/, { timeout });
    
    // Wait for the menu to be visible
    await this.page.waitForSelector(this.mainMenuLocator, { timeout });
    
    // Find and click the admin menu item
    const adminMenuItem = this.page.locator(this.adminMenuLocator);
    await adminMenuItem.waitFor({ timeout });
    await adminMenuItem.click();
    
    // Wait for the admin page to load
    await this.page.waitForURL(/admin/, { timeout });
    
    // Verify we're on the admin page
    await expect(this.page).toHaveURL(/admin/);
  }

  async getLoggedInUserName() {
    const timeout = 10000;
    try {
      // Wait for the user dropdown to be visible
      await this.page.waitForSelector('div.oxd-topbar-header-userarea', { timeout });
      // Get the user name from the user area
      const userName = await this.page.locator('div.oxd-topbar-header-userarea').textContent();
      return userName?.trim() || '';
    } catch (error) {
      console.error('Failed to get logged-in user name:', error);
      return '';
    }
  }
}
