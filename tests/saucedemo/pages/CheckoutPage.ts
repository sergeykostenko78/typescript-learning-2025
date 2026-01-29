import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    private cartItemTitle = this.page.locator('[data-test="inventory-item-name"]');
    private firstName = this.page.locator('[data-test="firstName"]');
    private lastName = this.page.locator('[data-test="lastName"]');
    private postalCode = this.page.locator('[data-test="postalCode"]');
    private continueCheckout = this.page.locator('[data-test="continue"]');
    private finishCheckout = this.page.locator('[data-test="finish"]');
    private cancelCheckout = this.page.locator('[data-test="cancel"]');
    private errorCheckout = this.page.locator('[data-test="error"]');
    private homeButton = this.page.locator('[data-test="back-to-products"]');

    constructor (page: Page) {
        super(page);
    }

    async getCartProductTitles(): Promise<string[]> {
        return await this.cartItemTitle.allTextContents();
    }

    async submitStepOne(firstname: string, lastname: string, postalcode: string): Promise<void> {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.postalCode.fill(postalcode);
        await this.continueCheckout.click();
    }

    async submitStepTwo(): Promise<void> {
        await this.finishCheckout.click();
    }

    async backHome(): Promise<void> {
        await this.homeButton.click();
    }

    async cancel(): Promise<void> {
        await this.cancelCheckout.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorCheckout.textContent() ?? '';
    }
}