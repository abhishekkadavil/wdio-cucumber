import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('select payment method', async function (this: ScenarioContext) {
  await this.pages.paymentMethodPage.selectPaymentMethod(
    this.testData.payment.pmtType
  );
});
