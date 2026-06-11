
import { test as baseTest } from '@playwright/test';

export const customTest = baseTest.extend({
    testDataForOrder: {
        username: "namithadsouza99@gmail.com",
        password: "Namitha@98",
        productName: "ZARA COAT 3"
    }
});
