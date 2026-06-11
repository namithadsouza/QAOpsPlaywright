import {Page,test, expect, Locator} from '@playwright/test';
export class CheckoutPage {
    page: Page;
    productListTag: Locator;
    checkOut: Locator;
    constructor(page: Page) {
        this.page=page;
        this.productListTag = page.locator("div li");
        this.checkOut = page.locator("text=Checkout");

    }

    async verifyProductIsDisplayed(productName: string) {
        await this.productListTag.first().waitFor();
        const bool = await this.getproductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async checkOutCart(){
        // page.locator("text=Checkout").click();
        await this.checkOut.click();

    }

     getproductLocator(productName: string) {
        return  this.page.locator("h3:has-text('"+productName+"')");
    }
}
