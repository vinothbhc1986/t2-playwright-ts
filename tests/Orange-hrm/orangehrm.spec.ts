import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Verify that entering valid credentials successfully logs the user in', async ({page}) => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        await loginPage.clickLogin();

        // Add assertion to verify successful login, e.g. by checking URL or presence of a specific element
        await expect(page).toHaveURL(/.*dashboard/); // Adjust the URL as per the dashboard URL
    });
});