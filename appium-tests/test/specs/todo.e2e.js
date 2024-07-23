const { expect, driver, $ } = require('@wdio/globals')

describe('Todo screen', () => {
    it('checks a todo as done', async () => {
        await driver.pause(100000);
        let firstTodo = await $(`~Some-todo-1`);
        await firstTodo.click();

        try {
            firstTodo = await $(`~Some-todo-1`);
        } catch(e) {
            firstTodo = await $(`//*[@resource-id="Some-todo-1-checkbox"]`);
        }

        const isChecked = await firstTodo.getAttribute('checked');

        expect(isChecked).toBe('true');
    });

    it('removes todo', async () => {
        let firstTodo = (await $(`~Some-todo-1`)).elementId;

        await driver.executeScript('mobile: swipeGesture', [{
            elementId: firstTodo,
            direction: 'left',
            percent: 0.9,
        }]);

        firstTodo = await $(`~Some-todo-1`);

        expect(firstTodo).not.toBeDisplayed();

    });

    it('creates a new todo', async () => {
        const button = await $(`~Add a task`);
        await button.click();

        const input1 = await $(`//*[@resource-id="task-name"]`);
        await input1.click();
        await input1.setValue("Task 1");


        const input2 = await $(`//*[@resource-id="task-description"]`);
        await input2.click();
        await input2.setValue("Description 1");

        const addButton = await $(`~Add`);
        await addButton.click();

        const newTask = await $('~Task 1');

        expect(newTask).toBeDisplayed();

    });
})

