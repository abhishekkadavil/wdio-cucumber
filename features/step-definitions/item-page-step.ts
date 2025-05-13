import { When } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

When('add item to cart', async function (this: ScenarioContext) {
  await this.pages.itemPage.addItemToCart(this.testData.items);
});
