const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "namithadsouza99@gmail.com", userPassword: "Namitha@98" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let responseObject;
const fakeResponse = { "data": [], "message": "No Orders" };

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
    //Mocking of API response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        //Fulfill the route with mocked response
        //Actual API response <>Fake API response <>Browser
        const response = await page.request.fetch(route.request());

        route.fulfill(
            {
                response,
                body: JSON.stringify(fakeResponse)
            }
        );

    });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.locator(".mt-4").textContent().then(text => console.log(text));

});