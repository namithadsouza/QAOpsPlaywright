const { test, expect } = require('@playwright/test');

test('Visual Comparison Test', async ({ page }) => {

      await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'partial.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshotHidden.png', fullPage: true });
    await expect(page.locator('#displayed-text')).toBeHidden();

});

test('Visual Comparison Test with Baseline', async ({ page }) => {
    await page.goto('https://www.google.com/');  
    expect(await page.screenshot()).toMatchSnapshot('google.png');
});