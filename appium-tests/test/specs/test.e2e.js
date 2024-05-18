const { expect, driver, $ } = require('@wdio/globals')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await driver.startActivity(
            'com.example.todoappflutter',
            'MainActivity',
        );

        const button = await $(`//*[@content-desc="Add a task"]`);
        await button.click();

        const input1 = await $(`//*[@hint="Task"]`);
        await input1.click();
        await input1.setValue("Task 1");

        await driver.pause(3000);

        const input2 = await $(`//*[@hint="Description"]`);
        await input2.click();
        await input2.setValue("Description 1");

        await driver.pause(3000);

        const addButton = await $(`//*[@content-desc="Add"]`);
        await addButton.click();

        const newTask = await $('//*[@content-desc="Task 1\nDescription 1"]');

        expect(newTask).toBeDisplayed();

    })
})

