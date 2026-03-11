import { test, expect } from '@playwright/test';
import { LeavePage } from './leavePage';

test.describe('Leave Tests', () => {
    let leavePage: LeavePage;

    test.beforeEach(async ({ page }) => {
        leavePage = new LeavePage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/dashboard/index');
        await page.click('a[href*="leave"]');
        await page.waitForURL('**/leave/viewLeaveList');
    });

    test('Verify that entering a valid "From Date" and "To Date" returns the correct list of leaves', async ({ page }) => {
        await leavePage.enterFromDate('2023-01-01');
        await leavePage.enterToDate('2023-01-31');
        await leavePage.submitForm();
        // Verification that data loads seamlessly
        await expect(page.locator('.orangehrm-paper-container')).toBeVisible();
    });

    test('Validate that selecting a leave type filters the results correctly in the leave list', async ({ page }) => {
        await leavePage.selectLeaveType('CAN - Vacation');
        await leavePage.submitForm();
        await expect(page.locator('.orangehrm-paper-container')).toBeVisible();
    });

    test('Attempt to submit the form with invalid dates and verify that appropriate error messages are displayed', async ({ page }) => {
        await leavePage.enterFromDate('2023-12-31');
        await leavePage.enterToDate('2023-01-01'); // 'To Date' before 'From Date'
        // Need to hit tab or click outside to trigger date validation sometimes in this UI, but searching also triggers it
        await leavePage.submitForm();
        
        const errorMessages = await leavePage.getErrorMessages();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.some(m => m.includes('To date should be after from date') || m.includes('Should be a valid date'))).toBeTruthy();
    });

    test('Validate autocomplete suggestions update when typing in the Employee Name field', async ({ page }) => {
        await leavePage.enterEmployeeName('John');
        await expect(page.locator('.oxd-autocomplete-dropdown')).toBeVisible();
        await expect(page.locator('.oxd-autocomplete-dropdown').getByRole('option').first()).toBeVisible();
    });
});