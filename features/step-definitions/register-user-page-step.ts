import { When, Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

When('navigate to register user page', async function (this: ScenarioContext) {
  await this.pages.registerUserPage.navigateToRegisterUserPage();
});

When('add personal details', async function (this: ScenarioContext) {
  await this.pages.registerUserPage.addPersonalDetails(
    this.testData.billingAddress.firstName,
    this.testData.billingAddress.lastName,
    this.testData.loginCredential.username
  );
});

When('add company details', async function (this: ScenarioContext) {
  await this.pages.registerUserPage.addCompanyDetails();
});

When('add options', async function (this: ScenarioContext) {});

When('add password', async function (this: ScenarioContext) {
  await this.pages.registerUserPage.addPassword(
    this.testData.loginCredential.password
  );
});

Then(
  'user should be able register successfully',
  async function (this: ScenarioContext) {
    await this.pages.registerUserPage.submitRegForm();
  }
);
