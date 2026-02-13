import { Locator, Page } from '@playwright/test';

export class LeavePage {
    constructor(private page: Page) {}

    get fromDateInput(): Locator {
        return this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
    }

    get toDateInput(): Locator {
        return this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(1);
    }

    get leaveStatusDropdown(): Locator {
        return this.page.locator('.oxd-multiselect-wrapper');
    }

    get leaveTypeDropdown(): Locator {
        return this.page.locator('.oxd-input-group').filter({ has: this.page.locator('label:has-text("Leave Type")') }).locator('.oxd-select-wrapper');
    }

    get employeeNameInput(): Locator {
        return this.page.locator('input[placeholder="Type for hints..."]');
    }

    get searchButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    get resetButton(): Locator {
        return this.page.locator('button[type="reset"]');
    }

    async fillFromDate(date: string) {
        await this.fromDateInput.fill(date);
    }

    async fillToDate(date: string) {
        await this.toDateInput.fill(date);
    }

    async selectLeaveStatus(status: string) {
        await this.leaveStatusDropdown.click();
        // Wait for the option to be visible
        const option = this.page.locator('[role="option"]').filter({ hasText: status }).first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }

    async selectLeaveType(type: string) {
        await this.leaveTypeDropdown.click();
        // Wait for the option to be visible
        const option = this.page.locator('[role="option"]').filter({ hasText: type }).first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }

    async enterEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickResetButton() {
        await this.resetButton.click();
    }
    
}
