import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('confirm order', async function (this: ScenarioContext) {
  await this.pages.orderConfirmationPage.confirmOrder();
});

Then(
  'order should be placed successfully',
  async function (this: ScenarioContext) {
    await this.pages.orderConfirmationPage.validateOrderPlacedSuccessfully();
  }
);
