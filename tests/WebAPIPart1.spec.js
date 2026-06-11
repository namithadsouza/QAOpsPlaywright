const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "namithadsouza99@gmail.com", userPassword: "Namitha@98" };
let token;
const orderPayload = { orders: [{ country: "United States", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let orderId;
test.beforeAll('Login and get token', async () => {
    const apiContext = await request.newContext();
    const loginApiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload
        });
    expect(loginApiResponse).toBeOK();
    //Ok() - Status is in the range 200-299
    expect(loginApiResponse.ok()).toBeTruthy();
    //To check for specific status code, we can use status() method to get the actual status code and compare it with expected value
    //expect(loginApiResponse.status()).toBe(200);
    const responseJson = await loginApiResponse.json();
    token = responseJson.token;
    console.log("api response is: " + JSON.stringify(responseJson));
    console.log("api status is: " + loginApiResponse.status());
    console.log("Login token is: " + token);

    const orderApiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
    expect(orderApiResponse).toBeOK();
    const orderResponseJson = await orderApiResponse.json();
    console.log("Order API response is: " + JSON.stringify(orderResponseJson));
    /*
    Response - {
    "orders": [
        "69c22f8cf86ba51a652195ec",
        "69c22f8cf86ba51a652195ef"
    ],
    "productOrderId": [
        "6960eae1c941646b7a8b3ed3",
        "6960eac0c941646b7a8b3e68"
    ],
    "message": "Order Placed Successfully"
}
    */
    orderResponseJson.orders.forEach(orderId => {
        console.log("Order ID: " + orderId);
    });
    orderId = orderResponseJson.orders[0];

});

test.beforeEach(({ }) => {

});


test('API login', async ({ page }) => {
    page.addInitScript(value => {
        //setItem(Key, Value)
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});