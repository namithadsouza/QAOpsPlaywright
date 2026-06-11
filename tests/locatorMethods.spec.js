const{test, expect}= require('@playwright/test');

test('Locator Methods', async ({page})=>{
    //GetByLabel - This locator method is used to locate form elements based on their associated label text. It is useful for locating  checkboxes, radio buttons, and other form controls that have a visible label. 
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Employed').check();

    //GetByLabel can also bre used to locate input fields given they are associated with their respective labels either by using the 'for' attribute in the label tag or by nesting the input field within the label tag.
    //  For example <label for="exampleInputPassword1">Password</label>
    // <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    //<label><input type="password">Password</input></label>
    //GetByPlaceholder - This locator method is used to locate input fields based on their placeholder text. It is useful for locating input fields that have a placeholder attribute, which provides a hint to the user about what type of information should be entered in the field.
    await page.getByPlaceholder('Password').fill('Namitha@98');


    //GetByRole - This locator method is used to locate elements based on their ARIA role. It is useful for locating elements that have a specific role, such as buttons, links, and form controls.
    await page.getByRole('button', { name: 'Submit' }).click(); 

    //GetByText - This locator method is used to locate elements based on their visible text content. It is useful for locating elements that have specific text, such as headings, paragraphs, and buttons.
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    await page.getByRole('link', { name: 'Shop' }).click();
    //Filter - This locator method is used to filter a set of elements based on specific criteria. It is useful for narrowing down a list of elements to find the one that matches certain conditions, such as text content or attributes.
    //Goto the card with the text 'Nokia Edge' and click the 'Add' button within that card
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add' }).click();
});