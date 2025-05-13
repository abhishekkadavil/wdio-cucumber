import { Given } from '@wdio/cucumber-framework';
import { DataReader } from '../utils/data-reader.ts';
import { ScenarioContext } from '../utils/scenario-context.ts';
import { browser } from '@wdio/globals';

Given(
  'user is on home page and test data present in {string}',
  async function (this: ScenarioContext, testDataPath) {
    // read test data
    const testDataReader: DataReader = new DataReader();
    this.testData = testDataReader.readJSON(testDataPath);

    await browser.url('/login');
  }
);
