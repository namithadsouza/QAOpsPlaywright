const { test, expect } = require('@playwright/test')

test('Using Browser Fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());
    await username.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']").toContainText('incorrect'));

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();

    //This wont wait for any time- it might return empty array list without waiting for page reload
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles) //print [] that is empty list
});

test('Using Page Fixture', async ({ page }) => {
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
})



test('Using Selectors', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator('.radiotextsty');
    const checkBox = page.locator("[type='checkbox']");
    const documentLink = page.locator("[href*='documents-request']");
    const techHireLink = page.locator("[href*='techsmarthire']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropdown.selectOption('consult');
    await radioButton.last().click();
    await page.locator('#okayBtn').click();
    await expect(radioButton.last()).toBeChecked();
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    expect(await checkBox.isChecked()).toBeTruthy();
    await page.pause();
    await checkBox.uncheck();
    await expect(checkBox).not.toBeChecked();
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    await expect(techHireLink).toHaveAttribute("href", "https://techsmarthire.com/");
    await expect(techHireLink).toHaveAttribute("class", "blinkingText");
    await page.pause();
    await signIn.click();

});

test('using child window', async ({ browser }) => {

    //Context for original page/initial page
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    page.pause();
    const documentLink = page.locator("[href*='documents-request']");  //This opens in separate tab
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),//This will wait for the new page to open
        documentLink.click()//This will click on the link and open the new page
    ]); //comes out of the promise only when statements fulfilled the promise
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const listArray = text.split('@'); //Output = ["Please email us at mentor", "rahulshettyacademy.com with below template to receive response"]
    const domain = listArray[1].split(' ')[0]; //Output = ["rahulshettyacademy.com", "with", "below", "template", "to", "receive", "response"] ==>
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());

});