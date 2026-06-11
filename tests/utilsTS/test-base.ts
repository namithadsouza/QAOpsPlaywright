
import { test as baseTest } from '@playwright/test';

type TestDataForOrderFixture = {
    testDataForOrder: {
        username: string;
        password: string;
        productName: string;
    };
};

export const customTest = baseTest.extend<TestDataForOrderFixture>({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "namithadsouza99@gmail.com",
            password: "Namitha@98",
            productName: "ZARA COAT 3"
        });
    }
});
