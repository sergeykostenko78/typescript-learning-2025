import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private usernameInput = this.page.locator('[data-test="username"]');
    private passwordInput = this.page.locator('[data-test="password"]');
    private loginButton = this.page.locator('[data-test="login-button"]');
    private errorMessage = this.page.locator('[data-test="error"]');
    private hamburgerMenu = this.page.locator('#react-burger-menu-btn');
    private logoutButton = this.page.locator('[data-test="logout-sidebar-link"]');

    constructor (page: Page) {
        super(page);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() ?? '';
    }

    async logout(): Promise<void> {
        await this.hamburgerMenu.click();
        await this.logoutButton.click();
    }

}