import  test from '@playwright/test';
import type { Page } from '@playwright/test';
import {customTest} from './utilsTS/test-base';
import POManager from './pageobjectsTS/POManager';
import testDataFile from './utilsTS/placeOrderTestData.json';
//Json -> Stringify -> String -> Parse -> Json
const testData = JSON.parse(JSON.stringify(testDataFile));


customTest("Client App login", async ({ page, testDataForOrder }: { page: Page; testDataForOrder: { username: string; password: string } }) => { 
  const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
   await loginPage.goToUrl()
   await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
});
 

for (const data of testData) {
test(`Client App login ${data.productName}`, async ({ page }: { page: Page}) => {
   const userEmail = data.username;
   const password = data.password;
   const productName = data.productName;
   
  const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
  const dashboardPage=poManager.getDashboardPage();
  const checkOutPage=poManager.getCheckOutPage();
  const orderReviewPage=poManager.getOrderReviewPage();
  const orderHistoryPage=poManager.getOrderHistoryPage();
   await loginPage.goToUrl()
   await loginPage.validLogin(userEmail,password);
  
   await dashboardPage.searchProductAndAddToCart(productName);
   await dashboardPage.navigateToCart();

   await checkOutPage.verifyProductIsDisplayed(productName);
   await checkOutPage.checkOutCart();

   await orderReviewPage.updateCountry("ind","India");
   const orderId=await orderReviewPage.confirmOrder();
   console.log("Order Id displayed in main code "+orderId);
   await dashboardPage.navigateToMyOrders();
   await orderHistoryPage.searchOrderAndVerify(orderId)
   
});
}