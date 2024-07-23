const { expect, driver, $ } = require('@wdio/globals')

describe('Drawing Screen', () => {
    it('validates the screen', async () => {
        const button = await $(`//*[@resource-id="drawing"]`);
        await button.click();


        await driver.action('pointer', {
            parameters: {
                pointerType: 'touch',
            },
        })
            .move({ origin: 'viewport', x: 210, y: 362 })
            .down()
            .move({ origin: 'viewport', x: 751, y: 908 })
            .up()
            .perform();

        await driver.action('pointer', {
            parameters: {
                pointerType: 'touch',
            },
        })
            .move({ origin: 'viewport', x: 862, y: 423 })
            .down()
            .move({ origin: 'viewport', x: 210, y: 900 })
            .up()
            .perform();

        await driver.action('pointer', {
            parameters: {
                pointerType: 'touch',
            },
        })
            .move({ origin: 'viewport', x: 553, y: 408 })
            .down()
            .move({ origin: 'viewport', x: 481, y: 1442 })
            .up()
            .perform();

        await expect(driver).toMatchScreenSnapshot('drawing', 10, {
            ignoreAntialiasing: true,
            ignoreAlpha: true,
        });
    });
})

