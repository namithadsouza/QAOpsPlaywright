import { AfterStep } from "@cucumber/cucumber";

//const { Before, After, Status, setDefaultTimeout } = require("@cucumber/cucumber");

import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";

//const { chromium } = require("@playwright/test");

import { chromium } from "@playwright/test";

setDefaultTimeout(60 * 1000);

Before(async function (this: any) {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: any, scenario: any
) {

    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, "image/png");
    }

    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();

});

AfterStep(async function (this: any, scenario: any) {

    if (scenario.result?.status === Status.FAILED ) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, "image/png");
    }   
});