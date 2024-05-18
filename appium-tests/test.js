const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.example.todoappflutter',
  'appium:appActivity': 'MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const button = await driver.$(`//*[@content-desc="Add a task"]`);
    await button.click();

    const input1 = await driver.$(`//*[@hint="Task"]`);
    await input1.click();
    await input1.setValue("Task 1");

    await driver.pause(3000);

    const input2 = await driver.$(`//*[@hint="Description"]`);
    await input2.click();
    await input2.setValue("Description 1");

    await driver.pause(3000);

    const addButton = await driver.$(`//*[@content-desc="Add"]`);
    await addButton.click();

    const newTask = await driver.$('//*[@content-desc="Task 1\nDescription 1"]');

    expect(newTask).toBeDisplayed();

    await driver.pause(10000);
  } finally {
    await driver.pause(3000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);