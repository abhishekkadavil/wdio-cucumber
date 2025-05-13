import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('checkout the cart', async function (this: ScenarioContext) {
  await this.pages.checkoutPage.checkoutCart();
});
