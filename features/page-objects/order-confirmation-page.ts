import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class OrderConfirmationPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private confirmOrderNextStepBtn = $(
    `//button[@class="button-1 confirm-order-next-step-button"]`
  );
  private orderCompletedAsrt = $(
    `//div[@class="section order-completed"]/div[@class="title"]`
  );

  async confirmOrder() {
    await this.interactionHelper.clickElement(this.confirmOrderNextStepBtn);
  }

  async validateOrderPlacedSuccessfully() {
    await this.interactionHelper.verifyElementText(
      this.orderCompletedAsrt,
      'Your order has been successfully processed!'
    );
  }
}
