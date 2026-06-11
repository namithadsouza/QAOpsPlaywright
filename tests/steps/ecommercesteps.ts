import { Given, When, Then } from '@cucumber/cucumber';
import POManager from '../pageobjectsTS/POManager';
import { expect } from '@playwright/test';


Given('I login to the ecommerce website with username {string} and password {string}', { timeout: 10 * 1000 }, async function (this: any, userEmail: string, password: string) {
  // const browser = await chromium.launch({ headless: false });
  // const context = await browser.newContext();
  // const page = await context.newPage();
  this.poManager = new POManager(this.page);
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goToUrl()
  await loginPage.validLogin(userEmail, password);
});

When('I add the product {string} to the cart', async function (this: any, productName: string) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAndAddToCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then('verify that the product {string} is added to the cart', async function (this: any, productName: string) {
  const checkOutPage = this.poManager.getCheckOutPage();
  await checkOutPage.verifyProductIsDisplayed(productName);
  await checkOutPage.checkOutCart();
});

When('I proceed to checkout and place the order', async function (this: any) {
  const orderReviewPage = this.poManager.getOrderReviewPage();
  await orderReviewPage.updateCountry("ind", "India");
  this.orderId = await orderReviewPage.confirmOrder();
  console.log("Order Id displayed in main code " + this.orderId);
});

Then('verify that the order is placed successfully', async function (this: any) {
  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await this.dashboardPage.navigateToMyOrders();
  await orderHistoryPage.searchOrderAndVerify(this.orderId)
});

Given('a login to Ecommerce2 application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

  // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
  const userName = this.page.locator('#username');
  const signIn = this.page.locator("#signInBtn");
  const cardTitles = this.page.locator(".card-body a");
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  //css 
  await userName.fill("rahulshetty");
  await this.page.locator("[type='password']").fill("learning");
  await signIn.click();
});


Then('Verify Error message is displayed', async function () {
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');

})