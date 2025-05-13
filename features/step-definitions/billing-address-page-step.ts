import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('select billing address', async function (this: ScenarioContext) {
  await this.pages.billingAddressPage.selectBillingAddress();
});

Then('add billing address', async function (this: ScenarioContext) {
  await this.pages.billingAddressPage.addBillingAddress(
    this.testData.billingAddress.country,
    this.testData.billingAddress.state,
    this.testData.billingAddress.address,
    this.testData.billingAddress.city,
    this.testData.billingAddress.zip,
    this.testData.billingAddress.mobilePh
  );
});
