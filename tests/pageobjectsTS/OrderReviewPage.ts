
import { Page, test, expect, Locator } from '@playwright/test';
export class OrderReviewPage {
    page: Page;
    dropdown: Locator;
    emailId: Locator;
    submit: Locator;
    orderConfirmationText: Locator;
    orderId: Locator;
    country: Locator;
    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.country = page.locator("[placeholder*='Country']");
    }

    async updateCountry(countryCode: string, countryName: string) {
        await this.country.pressSequentially(countryCode, { delay: 150 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            let text: any;
            text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async confirmOrder() {
        //expect(this.emailId).toHaveText(userEmail);
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        const orderId = this.orderId.textContent();
        console.log(orderId);
        return orderId;
    }
}
export default OrderReviewPage;