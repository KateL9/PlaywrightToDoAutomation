import { test, expect } from '@playwright/test';

test('Lambda Single Input Field test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    const inputField = page.locator('input#user-message');
    console.log(await inputField.getAttribute('placeholder'));
    await expect(inputField).toHaveAttribute('placeholder', 'Please enter your Message');
    await expect(inputField).toBeEmpty();
    await inputField.fill('test');
    console.log(await inputField.inputValue());
    const submitBtn = page.locator('#showInput');
    await submitBtn.click();
    const enteredMessage = page.locator('#message');
    await expect(enteredMessage).toContainText('test');
})

test('Lambda Two Input Fields test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    const firstNumber = page.locator('input#sum1');
    const secondNumber = page.locator('input#sum2');
    const getSumBtn = page.locator('form#gettotal > button');
    const result = page.locator('#addmessage');
    await firstNumber.fill('2');
    await secondNumber.fill('3');
    await getSumBtn.click();
    console.log(await result.textContent());
    const sum = 2 + 3;
    await expect(result).toHaveText(`${sum}`);
})

test('Lambda Single Checkbox test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
    const singleCheckbox = page.locator('#isAgeSelected');
    await singleCheckbox.check();
    await expect(singleCheckbox).toBeChecked();
})

test('Lambda Disabled Checkbox test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
    const checkbox3 = page.locator('div.pb-10 > div:nth-of-type(3)>input[type="checkbox"]');
    const checkbox4 = page.locator('div.pb-10 > div:nth-of-type(4)>input[type="checkbox"]');
    await expect(checkbox3).toBeDisabled();
    await expect(checkbox4).toBeDisabled();
})

test('Lambda Multiple Checkbox test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
    const checkAllBtn = page.locator('input#box');
    const checkboxes = page.locator('div.input-body input[type="checkbox"]');
    // const checkboxes = await page.locator('div.input-body input[type="checkbox"]').all(); - .all() - returns array. 
    // await doesn't work for 'for each' for(let checkbox in checkboxes) {
    //     await expect(checkbox).not.toBeChecked();
    // }
    for(let i = 0; i < await checkboxes.count(); i++) {
        await expect(checkboxes.nth(i)).not.toBeChecked();
    }
    
    await checkAllBtn.click();
    for(let i = 0; i < await checkboxes.count(); i++) {
        await expect(checkboxes.nth(i)).toBeChecked();
    }
})

