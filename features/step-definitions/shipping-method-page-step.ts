import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('select shipping method', async function (this: ScenarioContext) {
  this.pages.shippingMethodPage.selectShippingMethod();
});
