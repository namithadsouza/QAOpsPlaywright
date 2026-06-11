const{test,expect} = require('@playwright/test');

test('Calendar Widget', async ({page})=>{
    
    const month = "6";
    const year = "2024";
    const date = "20";
    const dateToSelect = month + "/" + date + "/" + year;
const expectedList={month,date, year};

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    
    await page.locator(".react-date-picker__inputGroup").click();
    //First for month
    await page.locator(".react-calendar__navigation__label").click();
    //2nd click for year- We are choosing year first
    await page.locator(".react-calendar__navigation__label").click();

    //select the year we want to select by using text locator and then click on it
    await page.getByText(year).click();
    //get all 12 months by common class and then click on the month we want
    page.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click();
    //or using xpath -  await page.locator("//abbr[text()='"+date+"']").click();
    page.locator(".react-calendar__month-view__days__day").nth(Number(date)).click();

    
    //Now we have to verify that the date is selected in the input box

    //Approach 1- Get the value of the input box and compare it with the date we selected
    // const selectedDate = await page.locator(".react-date-picker__inputGroup .date").inputValue();
    // expect(selectedDate).toBe(dateToSelect);

    //Approach 2- Get the 

    const inputValue = await page.locator(".react-date-picker__inputGroup__input");
    for(let i=0; i<expectedList.length; i++){
      const actualValue = await inputValue.nth(i).inputValue();
      expect(actualValue).toBe(expectedList[i]);
    }

});