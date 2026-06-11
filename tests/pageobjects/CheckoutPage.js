const {test, expect}=require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page=page;
        this.productListTag = page.locator("div li");
        this.checkOut = page.locator("text=Checkout");

    }

    async verifyProductIsDisplayed(productName) {
        await this.productListTag.first().waitFor();
        const bool = await this.getproductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async checkOutCart(){
        // page.locator("text=Checkout").click();
        await this.checkOut.click();

    }

     getproductLocator(productName){
        return  this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = { CheckoutPage }