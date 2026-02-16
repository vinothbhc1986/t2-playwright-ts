import { Page } from 'playwright';

export class LoginPage {
    private page: Page;

    constructor(page: Page) { 
        this.page = page;
    }

    private get usernameInput() {
        return this.page.locator('input[data-test="username"]');
    }

    private get passwordInput() {
        return this.page.locator('input[data-test="password"]');
    }

    private get loginButton() {
        return this.page.locator('input[data-test="login-button"]');
    }

    private get errorMessage() {
        return this.page.locator('.error-message-container');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessageText() {
        //
        return await this.errorMessage.innerText();
    }
}
