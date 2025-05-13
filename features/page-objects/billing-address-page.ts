import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class BillingAddressPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private billingAddressSaveBtn = $(
    `//div[@id="billing-buttons-container"]/button[@name="save"]`
  );
  private billingAddressCountrySel = $(
    `//select[@id="BillingNewAddress_CountryId"]`
  );
  private billingAddressStateSel = $(
    `//select[@id="BillingNewAddress_StateProvinceId"]`
  );
  private billingAddressCityTxtbx = $(`//input[@id="BillingNewAddress_City"]`);
  private billingAddressAddress1Txtbx = $(
    `//input[@id="BillingNewAddress_Address1"]`
  );
  private billingAddressPincodeTxtbx = $(
    `//input[@id="BillingNewAddress_ZipPostalCode"]`
  );
  private billingAddressPhonenoTxtbx = $(
    `//input[@id="BillingNewAddress_PhoneNumber"]`
  );

  async addBillingAddress(
    billingAddressCountry: string,
    billingAddressState: string,
    billingAddressAddress: string,
    billingAddressCity: string,
    billingAddressPincode: string,
    billingAddressPhoneno: string
  ) {
    await this.interactionHelper.selectElementByText(
      this.billingAddressCountrySel,
      billingAddressCountry
    );
    await this.interactionHelper.selectElementByText(
      this.billingAddressStateSel,
      billingAddressState
    );
    await this.interactionHelper.typeElement(
      this.billingAddressCityTxtbx,
      billingAddressCity
    );
    await this.interactionHelper.typeElement(
      this.billingAddressAddress1Txtbx,
      billingAddressAddress
    );
    await this.interactionHelper.typeElement(
      this.billingAddressPincodeTxtbx,
      billingAddressPincode
    );
    await this.interactionHelper.typeElement(
      this.billingAddressPhonenoTxtbx,
      billingAddressPhoneno
    );
  }
  async selectBillingAddress() {
    await this.interactionHelper.clickElement(this.billingAddressSaveBtn);
  }
}
