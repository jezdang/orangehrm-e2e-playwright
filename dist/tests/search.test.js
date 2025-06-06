"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const MenuPage_1 = require("../pages/MenuPage");
const EmployeeListPage_1 = require("../pages/EmployeeListPage");
const testData_1 = require("../data/testData");
let loginPage;
let menuPage;
let employeeListPage;
// Setup before each test
async function setupTest(page) {
    loginPage = new LoginPage_1.LoginPage(page);
    menuPage = new MenuPage_1.MenuPage(page);
    employeeListPage = new EmployeeListPage_1.EmployeeListPage(page);
    await loginPage.openLoginPage();
    await loginPage.loginDefault();
    await loginPage.verifyDashboard();
    await menuPage.goToEmployeeList();
}
test_1.test.describe('Employee Search Tests', () => {
    // Basic search tests
    (0, test_1.test)('should search for employee by name', async ({ page }) => {
        await setupTest(page);
        await employeeListPage.searchEmployee(testData_1.testData.employees[0].searchName);
        await employeeListPage.verifyEmployeeInResults(testData_1.testData.employees[0].searchName);
    });
    // Parameterized search failure tests
    (0, test_1.test)('should handle various search failure scenarios', async ({ page }) => {
        const searchScenarios = [
            { term: '', message: 'No results found' },
            { term: 'NonExistentEmployee', message: 'No results found' },
            { term: '!@#$%', message: 'No results found' }
        ];
        for (const scenario of searchScenarios) {
            await setupTest(page);
            await employeeListPage.searchEmployee(scenario.term);
            await employeeListPage.verifyNoResultsMessage();
        }
    });
    // Advanced search tests
    (0, test_1.test)('should search with multiple filters', async ({ page }) => {
        await setupTest(page);
        await employeeListPage.selectJobTitle('Software Engineer');
        await employeeListPage.selectStatus('Enabled');
        await employeeListPage.searchEmployee('');
        await employeeListPage.verifyResultsContainFilter('Software Engineer');
    });
    (0, test_1.test)('should handle pagination', async ({ page }) => {
        await setupTest(page);
        await employeeListPage.searchEmployee('');
        const totalRecords = await employeeListPage.getTotalRecords();
        await (0, test_1.expect)(totalRecords).toBeGreaterThan(0);
        // Navigate to next page
        await employeeListPage.goToNextPage();
        await (0, test_1.expect)(employeeListPage.getCurrentPage()).toBeGreaterThan(1);
    });
});
