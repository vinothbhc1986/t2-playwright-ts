import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('Verify that a user can successfully log in with valid credentials', async ({ page }) => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(/.*dashboard/);
    });

    test('Ensure that the login button is enabled when valid credentials are entered', async () => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        await expect(loginPage.loginButton).toBeEnabled();
    });

    test('Test the login functionality with an incorrect username and/or password', async ({ page }) => {
        await loginPage.enterUsername('InvalidUser');
        await loginPage.enterPassword('InvalidPass');
        await loginPage.clickLoginButton();
        await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    });

    test('Attempt to submit the login form with empty username and password fields', async ({ page }) => {
        await loginPage.clickLoginButton();
        await expect(loginPage.requiredErrorMessage.first()).toHaveText('Required');
        await expect(loginPage.requiredErrorMessage.nth(1)).toHaveText('Required');
    });

    test('Investigate if the login form retains the entered username after a failed login attempt', async ({ page }) => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('WrongPassword');
        await loginPage.clickLoginButton();
        await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
        await expect(loginPage.usernameInput).toHaveValue('Admin');
    });

    test('Simulate a user attempting to log in using a password manager', async ({ page }) => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123'); // Simulate autofill
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(/.*dashboard/);
    });

    test('Test the login form behavior when a user tries to paste credentials', async ({ page }) => {
        await loginPage.usernameInput.fill('Admin');
        await loginPage.passwordInput.fill('admin123'); // Simulate pasting
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(/.*dashboard/);
    });
});