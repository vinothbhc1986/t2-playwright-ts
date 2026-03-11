import { Locator, Page } from '@playwright/test';

export class LeavePage {
    constructor(private page: Page) {}

    private get fromDateInput(): Locator {
        return this.page.locator('.oxd-input-group').filter({ hasText: 'From Date' }).locator('input');
    }
    private get toDateInput(): Locator {
        return this.page.locator('.oxd-input-group').filter({ hasText: 'To Date' }).locator('input');
    }

    private get leaveTypeSelect(): Locator {
        return this.page.locator('.oxd-input-group').filter({ hasText: 'Leave Type' }).locator('.oxd-select-text');
    }

    private get employeeNameInput(): Locator {
        return this.page.getByPlaceholder('Type for hints...');
    }

    private get searchButton(): Locator {
        return this.page.getByRole('button', { name: 'Search' });
    }

    private get resetButton(): Locator {
        return this.page.getByRole('button', { name: 'Reset' });
    }

    private get errorMessages(): Locator {
        return this.page.locator('.oxd-input-field-error-message');
    }

    async enterFromDate(date: string) {
        await this.fromDateInput.fill(date);
    }

    async enterToDate(date: string) {
        await this.toDateInput.fill(date);
    }

    async selectLeaveType(type: string): Promise<void> {
        await this.leaveTypeSelect.click();
        await this.page.getByRole('option', { name: type }).click();
    }

    async enterEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async submitForm() {
        await this.searchButton.click();
    }

    async resetForm() {
        await this.resetButton.click();
    }

    async getErrorMessages() {
        return this.errorMessages.allTextContents();
    }
}
