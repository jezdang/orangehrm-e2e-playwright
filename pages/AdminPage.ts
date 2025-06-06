import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class AdminPage extends BasePage {
  private searchButton: Locator;
  private resultsTable: Locator;
  private resultsFirstRow: Locator;
  private usernameColumn: Locator;

  constructor(page: Page) {
    super(page);
    this.searchButton = page.locator('button[type="submit"]');
    this.resultsTable = page.locator('.oxd-table');
    this.resultsFirstRow = this.resultsTable.locator('.oxd-table-row');
    this.usernameColumn = this.resultsFirstRow.locator('.oxd-table-cell:nth-child(2)');
  }

  async searchBy(searchBy: string, searchTerm: string) {
    const inputLocator = this.page.locator(`//label[text()='${searchBy}']/parent::div/following-sibling::div/input`);
    await inputLocator.fill(searchTerm);
    await this.searchButton.click();
    await this.resultsTable.waitFor();
  }

  async verifyUsernameExists(expectedUsername: string) {
    const username = await this.usernameColumn.first().textContent();
    if (username === null) {
      throw new Error('Username text content is null');
    }
    await expect(username).toBe(expectedUsername);
  }

  getNoRecordFoundMessage(): Locator {
    return this.page.locator('span.oxd-text:has-text("No Records Found")');
  }
}
