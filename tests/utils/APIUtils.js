class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginApiResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        });
        const responseJson = await loginApiResponse.json();
        console.log("Login API response in APIUtils: " + JSON.stringify(responseJson));
        return responseJson.token;
    }

    async createOrder(orderPayload) {
        const responseObject = {};
        responseObject.token = await this.getToken();
        const orderApiResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': responseObject.token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderApiResponse.json();
        console.log("Order API response in APIUtils: " + JSON.stringify(orderResponseJson));
        const orderId = orderResponseJson.orders[0];
        responseObject.orderId = orderId;
        return responseObject;
    }
}

module.exports = { APIUtils };