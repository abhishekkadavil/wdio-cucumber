import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class ShippingMethodPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private shippingMethodNextStepBtn = $(
    `//div[@id="shipping-method-buttons-container"]/button[@class="button-1 shipping-method-next-step-button"]`
  );

  async selectShippingMethod() {
    await this.interactionHelper.clickElement(this.shippingMethodNextStepBtn);
  }
}
