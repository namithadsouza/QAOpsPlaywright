const { test, expect } = require('@playwright/test');

test('Hidden Dialog Validation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

});

test('alert pop up/dialog validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

});

test('Page Hover', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#mousehover').hover();
    await page.locator('text=Top').click();

});

test('Child Window Validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('li a[href*="lifetime-access"]:visible').click();
    const textCheck = await frame.locator('.text h2').textContent();
    console.log(textCheck);

});

test.skip('Tracking Request Calls', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url() + " " + response.status()));

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