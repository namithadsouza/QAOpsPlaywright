const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "namithadsouza99@gmail.com", userPassword: "Namitha@98" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let responseObject;

test.beforeAll('Login and get token', async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    responseObject = await apiUtils.createOrder(orderPayload);
    console.log("Response: " + JSON.stringify(responseObject));

});

test('Place Order', async ({ page }) => {
    page.addInitScript(value => {
        //setItem(Key, Value)
        window.localStorage.setItem('token', value);
    }, responseObject.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (responseObject.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(responseObject.orderId.includes(orderIdDetails)).toBeTruthy();

    
});