import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    get usernameInput(): Locator {
        return this.page.getByPlaceholder('Username');
    }

    get passwordInput(): Locator {
        return this.page.getByPlaceholder('Password');
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: /login/i });
    }

    get errorMessage(): Locator {
        return this.page.locator('.oxd-alert-content-text'); 
    }

    get requiredErrorMessage(): Locator {
         return this.page.locator('.oxd-input-group__message');
    }

    // Actions
    async navigateToLogin() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getErrorMessageText() {
        return await this.errorMessage.innerText();
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}
