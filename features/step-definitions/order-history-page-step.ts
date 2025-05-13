import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then(
  'order can be view in order history',
  async function (this: ScenarioContext) {
    await browser.url('/order/history');
  }
);
