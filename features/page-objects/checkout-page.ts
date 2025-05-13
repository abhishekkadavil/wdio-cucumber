import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class CheckoutPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private checkoutNotificationBar = $(`//div[@id="bar-notification"]//span`);
  private shoppingCartBtn = $(`//a[@class="ico-cart"]`);
  private termsOfServiceChkBx = $(`//input[@id="termsofservice"]`);
  private checkoutBtn = $(`//button[@id="checkout"]`);

  async checkoutCart() {
    await this.interactionHelper.clickElement(this.checkoutNotificationBar);
    await this.interactionHelper.clickElement(this.shoppingCartBtn);
    await this.interactionHelper.clickElement(this.termsOfServiceChkBx);
    await this.interactionHelper.clickElement(this.checkoutBtn);
  }
}
