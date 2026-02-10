import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

const baseUrl = 'https://www.saucedemo.com/';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
        loginPage = new LoginPage(page);
    });

    test('Verify that the user can successfully log in with valid credentials', async ({page}) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory\.html/);
    });

    test('Validate that the system redirects the user to the correct page after a successful login', async ({page}) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory\.html/);
    });

    test('Attempt to log in with an incorrect username and correct password', async () => {
        await loginPage.login('wrong_user', 'secret_sauce');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Username and password do not match any user in this service');
    });

    test('Attempt to log in with a correct username and an incorrect password', async () => {
        await loginPage.login('standard_user', 'wrong_password');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Username and password do not match any user in this service');
    });
});
// Additional tests can be added here to cover more scenarios, such as empty fields, special characters, etc.