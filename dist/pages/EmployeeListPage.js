"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeListPage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class EmployeeListPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.employeeListMenu = 'text=Employee List';
        this.employeeNameInput = 'input[placeholder="Type for hints..."]';
        this.searchButton = 'button:has-text("Search")';
        this.resultTableBody = 'div.oxd-table-body';
        this.noRecordsMessage = 'div.oxd-table-card:has-text("No Records Found")';
        this.jobTitleSelect = 'select[name="--Select--"]';
        this.statusSelect = 'select[name="-- Select --"]';
        this.pagination = 'div.oxd-pagination';
        this.currentPageLocator = 'span.oxd-pagination-page-number';
        this.totalRecordsLocator = 'div.oxd-table-filter-row div.oxd-input-group';
    }
    async navigateToEmployeeList() {
        // Ensure the PIM menu is clicked first to navigate to Employee List
        await this.page.click('text=PIM');
        // Then click on the Employee List menu item  
        await this.page.click(this.employeeListMenu);
    }
    async searchEmployee(name) {
        await this.page.fill(this.employeeNameInput, name);
        await this.page.click(this.searchButton);
    }
    async verifyEmployeeInResults(name) {
        await (0, test_1.expect)(this.page.locator(this.resultTableBody)).toContainText(name);
    }
    async verifyNoResultsMessage() {
        await (0, test_1.expect)(this.page.locator(this.noRecordsMessage)).toBeVisible();
    }
    async selectJobTitle(title) {
        await this.page.selectOption(this.jobTitleSelect, title);
    }
    async selectStatus(status) {
        await this.page.selectOption(this.statusSelect, status);
    }
    async verifyResultsContainFilter(filterValue) {
        await (0, test_1.expect)(this.page.locator(this.resultTableBody)).toContainText(filterValue);
    }
    async getTotalRecords() {
        const text = await this.page.locator(this.totalRecordsLocator).textContent();
        const match = text?.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }
    async goToNextPage() {
        await this.page.click(`${this.pagination} button:has-text("Next")`);
    }
    async getCurrentPage() {
        const text = await this.page.locator(this.currentPageLocator).textContent();
        return parseInt(text || '1');
    }
}
exports.EmployeeListPage = EmployeeListPage;
