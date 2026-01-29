import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    private cartItemTitle = this.page.locator('[data-test="inventory-item-name"]');
    private checkoutLink = this.page.locator('[data-test="checkout"]');

    constructor (page: Page) {
        super(page);
    }

    async getCartProductTitles(): Promise<string[]> {
        return await this.cartItemTitle.allTextContents();
    }

    async navigateToCheckout(): Promise<void> {
        await this.checkoutLink.click();
    }

}