const {test, expect} =require('@playwright/test')

test('E Commerce - Rahul Shetty Academy', async ({page})=>{
    //Pre-Reqisite: User should have an account in the application
    
    const products= page.locator('.card-body');
    const productName= 'ZARA COAT 3';
    const userEmail= 'namithadsouza99@gmail.com';
    //STEP 1: Login to the application
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill('Namitha@98');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //This steps handles all  the network calls
    await page.locator('.card-body b').first().waitFor(); //This waits for images to load as well  
    const titles=await page.locator('.card-body b').allTextContents();
    console.log(titles);

    //STEP 2: Find the product and add to cart
    const productCount= await products.count();
    for(let i=0; i<productCount; i++){
          //chaining of locators using .locator(tag)
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    //STEP 3: Go to Cart and verify if the product is added
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    //This is not purely text locator, it is a combination of text and tag- so we can use :has-text() pseudo class to find the element
    //isVisible() is not part of playwrights auto wait methos list so we need make sure cart items are loaded first
    const isElementPresent=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isElementPresent).toBeTruthy();
    console.log("IS element present: "+isElementPresent);

    //STEP 4: Proceed to checkout
    await page.locator("text=Checkout").click();
    await page.locator(".payment").first().waitFor();
    //Step 5: Enter CVV- Experiment later
    //await page.locator(".input.txt").fill("123");

   
   
   
     //Step 7: Verify user email is is accurate
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);

     //Step 6: Select country from dynamic dropdown
    //Use PressSequentially to type in the input field with delay between keystrokes to trigger the dropdown options. Avoid using fill() method as it types the entire text at once and dropdown options may not appear
   
    
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const dropdownOptions= page.locator(".ta-results");
    await dropdownOptions.waitFor();

   
    //Step 8: Select the desired country from the dropdown options
    const optionCount= await dropdownOptions.locator("button").count();
    for(let i=0; i<optionCount; i++){
        if(await dropdownOptions.locator("button").nth(i).textContent() === " India"){
            await dropdownOptions.locator("button").nth(i).click();
            break;
        }
    }


    //Step 9: Place the order and verify the confirmation message
    await page.locator("text=Place Order").click();

    const confirmationMessage= await page.locator(".hero-primary").textContent();
    expect(confirmationMessage).toBe(" Thankyou for the order. ");

    //Step 10: Capture the order ID for future reference
    const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID: "+orderId);

    //Step 11: Make sure order is part of the order history
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const orderHistoryCount= await page.locator("tbody tr").count();
    for(let i=0; i<orderHistoryCount; i++){
        const rowOrderId= await page.locator("tbody tr").nth(i).locator("th").textContent();
        if(rowOrderId.includes(orderId)){
            console.log("Found order in history");
            await page.locator("tbody tr").nth(i).locator("button").first().click();
            break;
        }
    }
      const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

