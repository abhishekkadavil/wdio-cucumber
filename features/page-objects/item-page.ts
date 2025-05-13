import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class ItemPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private itemQuantityTxtbx = $(`//input[@aria-label="Enter a quantity"]`);
  private addToCartBtn = $(`//button[@class="button-1 add-to-cart-button"]`);

  async addItemToCart(items: any[]) {
    for (const item of items) {
      await browser.url(item.url); // Navigate to item URL

      await this.interactionHelper.typeElement(
        this.itemQuantityTxtbx,
        item.quantity
      );
      await this.interactionHelper.clickElement(this.addToCartBtn);
    }
  }
}
