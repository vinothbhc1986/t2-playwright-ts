import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
     private usernameField = 'input[name="username"]';
    constructor(page: Page) {
        this.page = page;
    }

    private get usernameInput(): Locator {
        return this.page.locator('input[name="username"]');
    }

    private get passwordInput(): Locator {
        return this.page.locator('input[name="password"]');
    }

    private get loginButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    private get errorMessage(): Locator {
        return this.page.locator('.orangehrm-login-error');
    }

    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async enterUsername(username: string) {
        await this.page.waitForSelector(this.usernameField)
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }
}