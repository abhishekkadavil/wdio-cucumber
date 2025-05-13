import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class PaymentMethodPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private paymentMethodCheckBtn = $(`//input[@id="paymentmethod_0"]`);
  private paymentMethodCardBtn = $(`//input[@id="paymentmethod_1"]`);
  private paymentMethodSaveBtn = $(
    `//div[@id="payment-method-buttons-container"]/button[@name="save"]`
  );
  private paymentInfoNextBtn = $(
    `//div[@id="payment-info-buttons-container"]/button[@class="button-1 payment-info-next-step-button"]`
  );
  private cardHolderNameTxtBx = $(`//input[@id="CardholderName"]`);
  private cardNumberTxtBx = $(`//input[@id="CardNumber"]`);
  private cardExpiryDateYearSel = $(`//select[@id="ExpireYear"]`);
  private cardCodeTxtBx = $(`//input[@id="CardCode"]`);

  async selectPaymentMethod(paymentType: string) {
    if (paymentType.toLowerCase() === 'check') {
      await this.interactionHelper.clickElement(this.paymentMethodCheckBtn);
      await this.interactionHelper.clickElement(this.paymentMethodSaveBtn);
      await this.interactionHelper.clickElement(this.paymentInfoNextBtn);
    } else {
      await this.interactionHelper.clickElement(this.paymentMethodCardBtn);
      await this.interactionHelper.typeElement(
        this.cardHolderNameTxtBx,
        'gsadsad Kadavil'
      );
      await this.interactionHelper.typeElement(
        this.cardNumberTxtBx,
        '4001919257537193'
      );
      await this.interactionHelper.selectElementByIndex(
        this.cardExpiryDateYearSel,
        3
      );
      await this.interactionHelper.typeElement(this.cardCodeTxtBx, '123');
      await this.interactionHelper.clickElement(this.paymentInfoNextBtn);
    }
  }
}
