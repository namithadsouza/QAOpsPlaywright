const { test, expect } = require('@playwright/test');


test('@QW Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("namithadsouza99@gmail.com");
    await page.locator("#userPassword").fill("Namitha@98");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})

test('Using Browser Fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route("**/*.{jpg,png,jpeg}", route => route.abort());
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();

    //This wont wait for any time- it might return empty array list without waiting for page reload
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles) //print [] that is empty list
});