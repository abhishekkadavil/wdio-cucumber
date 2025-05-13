import { Given, Then } from '@wdio/cucumber-framework';
import { DataReader } from '../utils/data-reader.ts';
import { ScenarioContext } from '../utils/scenario-context.ts';
import { browser } from '@wdio/globals';
import logger from '../utils/logger.ts';

Given(
  'user is on home page and test data present in {string}',
  async function (this: ScenarioContext, testDataPath) {
    // read test data
    const testDataReader: DataReader = new DataReader();
    this.testData = testDataReader.readJSON(testDataPath);

    await browser.url('/login');
  }
);

Then(
  'Save order number in scenario context key {string}',
  async function (this: ScenarioContext, scenarioContextKey) {
    const orderNumber = await this.pages.orderConfirmationPage.getOrderNo();
    this.runtimeData[scenarioContextKey] = orderNumber;
    logger.info('Saved Order Number:', orderNumber);
  }
);

Then(
  'I search for the created order from scenario context key {string}',
  async function (this: ScenarioContext, scenarioContextKey) {
    const orderNumber = this.runtimeData[scenarioContextKey];
    logger.info('Using Order Number:', orderNumber);
  }
);
