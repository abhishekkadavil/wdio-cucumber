import { setWorldConstructor, World } from '@cucumber/cucumber';
import { BillingAddressPage } from '../page-objects/billing-address-page.ts';
import { CheckoutPage } from '../page-objects/checkout-page.ts';
import { ItemPage } from '../page-objects/item-page.ts';
import { LoginPage } from '../page-objects/login-page.ts';
import { OrderConfirmationPage } from '../page-objects/order-confirmation-page.ts';
import { OrderHistoryPage } from '../page-objects/order-history-page.ts';
import { PaymentMethodPage } from '../page-objects/payment-method-page.ts';
import { RegisterUserPage } from '../page-objects/register-user-page.ts';
import { ShippingAddressPage } from '../page-objects/shipping-address-page.ts';
import { ShippingMethodPage } from '../page-objects/shipping-method-page.ts';

import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class ScenarioContext extends World {
  public testData: any;
  public runtimeData: Record<string, any>;
  public interactionHelper: InteractionHelper;

  // Attach page objects per scenario
  public pages: {
    billingAddressPage: BillingAddressPage;
    checkoutPage: CheckoutPage;
    itemPage: ItemPage;
    loginPage: LoginPage;
    orderConfirmationPage: OrderConfirmationPage;
    orderHistoryPage: OrderHistoryPage;
    paymentMethodPage: PaymentMethodPage;
    registerUserPage: RegisterUserPage;
    shippingAddressPage: ShippingAddressPage;
    shippingMethodPage: ShippingMethodPage;
  };

  constructor(options: any) {
    super(options);
    this.testData = {};
    this.runtimeData = {}; // This will store data like order number, session token etc.
    this.interactionHelper = new InteractionHelper(); // unique per scenario

    this.pages = {
      billingAddressPage: new BillingAddressPage(this.interactionHelper),
      checkoutPage: new CheckoutPage(this.interactionHelper),
      itemPage: new ItemPage(this.interactionHelper),
      loginPage: new LoginPage(this.interactionHelper),
      orderConfirmationPage: new OrderConfirmationPage(this.interactionHelper),
      orderHistoryPage: new OrderHistoryPage(this.interactionHelper),
      paymentMethodPage: new PaymentMethodPage(this.interactionHelper),
      registerUserPage: new RegisterUserPage(this.interactionHelper),
      shippingAddressPage: new ShippingAddressPage(this.interactionHelper),
      shippingMethodPage: new ShippingMethodPage(this.interactionHelper),
    };
  }
}

setWorldConstructor(ScenarioContext);
