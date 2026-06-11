import {LoginPage} from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderHistoryPage  } from './OrderHistoryPage';
import { OrderReviewPage } from './OrderReviewPage';
import {Page} from '@playwright/test';

class POManager {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    checkOutPage: CheckoutPage;
    orderHistoryPage: OrderHistoryPage;
    orderReviewPage: OrderReviewPage;
    page: Page;
    constructor(page: Page) {
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkOutPage = new CheckoutPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
    }

    getLoginPage()
    {
      return this.loginPage;
    }
    getDashboardPage(){
      return this.dashboardPage;
    }
    getCheckOutPage(){
        return this.checkOutPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }

    getOrderReviewPage(){
        return this.orderReviewPage;
    }
}
export default POManager;