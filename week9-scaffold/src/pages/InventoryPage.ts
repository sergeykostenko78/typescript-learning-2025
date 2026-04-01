import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {

    private sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    private productTitle = this.page.locator('[data-test="inventory-item-name"]');
    private productPrice = this.page.locator('[data-test="inventory-item-price"]');
    private cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    private cartLink = this.page.locator('[data-test="shopping-cart-link"]');

    constructor (page: Page) {
        super(page);
    }

    async sortBy(option: string): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        return await this.productTitle.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const priceString = await this.productPrice.allTextContents();
        return priceString.map(price => parseFloat(price.replace('$', '')));
    }

    async clickFirstTitle(): Promise<void> {
        await this.productTitle.first().click();
    }

    async addToCart(productName: string): Promise<void> {
        const dataTestId = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="add-to-cart-${dataTestId}"]`).click();
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.cartBadge;
        if (await badge.isVisible()) {
          const text = await badge.textContent();
          return parseInt(text ?? '0', 10);
      }
      return 0;
    }

    async removeFromCart(productName: string): Promise<void> {
        const dataTestId = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="remove-${dataTestId}"]`).click();
    }

    async navigateToCart(): Promise<void> {
        await this.cartLink.click();
    }
}