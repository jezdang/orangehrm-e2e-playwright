"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuPage = void 0;
const BasePage_1 = require("./BasePage");
class MenuPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.employeeListMenu = 'text=Employee List';
        this.pimMenu = 'text=PIM';
        this.pimMenuLocator = 'div.oxd-main-menu-item-wrapper:has-text("PIM")';
        this.employeeListLocator = 'div.oxd-topbar-body-nav-tab-item:has-text("Employee List")';
    }
    async goToEmployeeList() {
        // First click PIM menu to expand it
        await this.page.waitForSelector(this.pimMenuLocator);
        await this.page.click(this.pimMenuLocator);
        // Then click Employee List
        await this.page.waitForSelector(this.employeeListLocator);
        await this.page.click(this.employeeListLocator);
        // Wait for the Employee List page to load
        await this.page.waitForSelector('div.oxd-table-filter-card');
    }
    async goToPIM() {
        await this.page.waitForSelector(this.pimMenuLocator);
        await this.page.click(this.pimMenuLocator);
    }
}
exports.MenuPage = MenuPage;
