import { Locator, Page } from '@playwright/test';

export class EmployeeReviewPage {
    public page: Page;
    private employeeNameInput: Locator;
    public jobTitleDropdown: Locator;
    public subUnitDropdown: Locator;
    public reviewStatusDropdown: Locator;
    private fromDateInput: Locator;
    private toDateInput: Locator;
    private resetButton: Locator;
    private searchButton: Locator;
    private autocompleteSuggestions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.jobTitleDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }).locator('.oxd-select-text');
        this.subUnitDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Sub Unit' }).locator('.oxd-select-text');
        this.reviewStatusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Review Status' }).locator('.oxd-select-text');
        this.fromDateInput = page.locator('.oxd-input-group').filter({ hasText: 'From Date' }).locator('input');
        this.toDateInput = page.locator('.oxd-input-group').filter({ hasText: 'To Date' }).locator('input');
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.autocompleteSuggestions = page.locator('.oxd-autocomplete-option');
    }

    async fillEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async selectFirstJobTitle() {
        await this.jobTitleDropdown.click();
        const option = this.page.locator('.oxd-select-dropdown .oxd-select-option').nth(1); // 0 is usually 'Select'
        await option.waitFor();
        await option.click();
    }

    async selectFirstSubUnit() {
        await this.subUnitDropdown.click();
        const option = this.page.locator('.oxd-select-dropdown .oxd-select-option').nth(1);
        await option.waitFor();
        await option.click();
    }

    async selectFirstReviewStatus() {
        await this.reviewStatusDropdown.click();
        const option = this.page.locator('.oxd-select-dropdown .oxd-select-option').nth(1);
        await option.waitFor();
        await option.click();
    }

    async fillFromDate(date: string) {
        await this.fromDateInput.fill(date);
    }

    async fillToDate(date: string) {
        await this.toDateInput.fill(date);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickResetButton() {
        await this.resetButton.click();
    }

    async getAutocompleteSuggestions() {
        await this.page.waitForSelector('.oxd-autocomplete-option');
        return await this.autocompleteSuggestions.allTextContents();
    }

    async getDropdownOptions() {
        return await this.page.locator('.oxd-select-dropdown .oxd-select-option').allTextContents();
    }
}