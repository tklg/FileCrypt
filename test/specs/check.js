const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

let o = new chrome.Options()
o.addArguments('disable-infobars')
o.addArguments('headless');
o.setUserPreferences({ credential_enable_service: false })

const { describe, it, after, before } = require('mocha');

const chai = require('chai');
const expect = chai.expect;

process.on('unhandledRejection', () => {});

describe('check all at the same time, for now', async function () {
  // this.timeout(30000);
  console.log('desc')
  const driver = await new Builder()
    .setChromeOptions(o)
    .forBrowser('chrome')
    .build()
  console.log(driver)
  await driver.get('http://localhost:9000')
  console.log('driver')

  let btns = await driver.findElement('#btns');
  let tests = ['generateKey','exportKey','importKey','ab2str','encrypt','decrypt','importPassword'];
  let out = await driver.findElement('#output');

  await driver.wait(until.elementLocated('#' + tests[tests.length - 1]), 500);

  for (let i = 0; i < tests.length; i++) {
    it(tests[i], async function () {
      (await btns.findElement('#'+tests[i])).click();
      expect((await driver.findElement('#output').getText()).indexOf('success') > -1).to.be(true)
    });
  }
});
