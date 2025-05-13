import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class LoginPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private usernameTxtbx = $(`//input[@id="Email"]`);
  private passwordTxtbx = $(`//input[@id="Password"]`);
  private loginBtn = $(`//button[text()="Log in"]`);
  private logoutBtn = $(`//a[@class="ico-logout"]`);
  private loginErrorMsg = $(
    `//div[@class="message-error validation-summary-errors"]`
  );

  async loginUsingCredential(uname: string, pass: string) {
    await this.interactionHelper.typeElement(this.usernameTxtbx, uname);
    await this.interactionHelper.typeElement(this.passwordTxtbx, pass);
    await this.interactionHelper.clickElement(this.loginBtn);
  }
  async validateSuccessfulLogin() {
    await this.interactionHelper.verifyElementText(this.logoutBtn, 'Log out');
  }

  async validateLoginMessage(loginMsg: string) {
    await this.interactionHelper.verifyElementText(
      this.loginErrorMsg,
      loginMsg
    );
  }
}
