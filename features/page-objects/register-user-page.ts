import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class RegisterUserPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private registerBtn = $(`//a[text()="Register"]`);
  private genderBtn = $(`//input[@id="gender-male"]`);
  private firstNameTxtBx = $(`//input[@id="FirstName"]`);
  private lastNameTxtBx = $(`//input[@id="LastName"]`);
  private dateOfBirthDaySel = $(`//select[@name="DateOfBirthDay"]`);
  private dateOfBirthMonthSel = $(`//select[@name="DateOfBirthMonth"]`);
  private dateOfBirthYearSel = $(`//select[@name="DateOfBirthYear"]`);
  private emailTxtBx = $(`//input[@id="Email"]`);
  private companyTxtBx = $(`//input[@id="Company"]`);
  private passwordTxtBx = $(`//input[@id="Password"]`);
  private confirmPasswordTxtBx = $(`//input[@id="ConfirmPassword"]`);
  private registerUserBtn = $(`//button[@id="register-button"]`);
  private logOutBtn = $(`//a[text()='Log out']`);
  private regResult = $(`//div[@class="result"]`);

  async navigateToRegisterUserPage() {
    await this.interactionHelper.clickElement(this.registerBtn);
  }

  async addPersonalDetails(fname: string, lname: string, email: string) {
    await this.interactionHelper.clickElement(this.genderBtn);
    await this.interactionHelper.typeElement(this.firstNameTxtBx, fname);
    await this.interactionHelper.typeElement(this.lastNameTxtBx, lname);
    await this.interactionHelper.typeElement(this.emailTxtBx, email);
  }
  async addCompanyDetails() {
    await this.interactionHelper.typeElement(this.companyTxtBx, 'QBurstosis');
  }
  async addPassword(pass: string) {
    await this.interactionHelper.typeElement(this.passwordTxtBx, pass);
    await this.interactionHelper.typeElement(this.confirmPasswordTxtBx, pass);
  }

  async submitRegForm() {
    await this.interactionHelper.clickElement(this.registerUserBtn);
    await this.interactionHelper.verifyElementText(
      this.regResult,
      'Your registration completed'
    );
    await this.interactionHelper.clickElement(this.logOutBtn);
  }
}
