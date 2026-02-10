import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) {}

    get itemNames() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    get itemDescriptions() {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    get itemPrices() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    get itemImages() {
        return this.page.locator('[data-test*="img-link"]');
    }

    get addToCartButtons() {
        return this.page.locator('[data-test*="add-to-cart"]');
    }

    get cartCount() {
        return this.page.locator('.shopping_cart_badge');
    }

    async verifyItemDetails(index: number, expectedName: string, expectedDescription: string, expectedPrice: string) {
        const name = await this.itemNames.nth(index).innerText();
        const description = await this.itemDescriptions.nth(index).innerText();
        const price = await this.itemPrices.nth(index).innerText();
        return {name, description, price};
    }

    async clickItemImage(index: number) {
        await this.itemImages.nth(index).click();
    }

    async isAddToCartButtonEnabled(index: number) {
        return await this.addToCartButtons.nth(index).isEnabled();
    }

    async addItemToCart(index: number) {
        await this.addToCartButtons.nth(index).click();
    }

    async getCartCount() {
        return await this.cartCount.innerText();
    }

    async checkPriceIsPositive(index: number) {
        const priceText = await this.itemPrices.nth(index).innerText();
        return parseFloat(priceText.replace('$', ''));
        
       
    }

    async checkCartCountAfterAdding(index: number) {
        await this.addItemToCart(index);
        const count = await this.getCartCount();
        return count;
        
    }

    async checkCartCountAfterRemoving(index: number) {
        await this.addItemToCart(index);
        await this.addToCartButtons.nth(index).click(); // Simulating removal
        const count = await this.getCartCount();
        return count;
    }

    async refreshPageAndCheckState() {
        await this.page.reload();
        const count = await this.getCartCount();
        return count;
    }   

    async resizeWindowAndCheckLayout() {
        await this.page.setViewportSize({ width: 800, height: 600 });
    }
}