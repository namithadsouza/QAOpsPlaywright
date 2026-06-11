import {Page,test, expect, Locator} from '@playwright/test';
export class LoginPage {
page: Page;
userEmail: Locator  ;
userPassword: Locator;
signInButton: Locator;  
    constructor(page: Page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail")
        this.userPassword = page.locator("#userPassword")
        this.signInButton = page.locator("[value='Login']")
        this.signInButton = page.locator("[value='Login']")
    }

    async goToUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client");

    }

    async validLogin(username: string, password: string) {
        await this.userEmail.fill(username);
        await this.userPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }


}
