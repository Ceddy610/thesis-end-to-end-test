const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:appPackage': 'com.example.todoappflutter',
  'appium:appActivity': '.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {

    const button = await driver.$('//*[@resource-id="drawing"]');
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


  } finally {
    await driver.pause(3000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);