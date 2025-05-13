import { When, Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

When('login using the credentials', async function (this: ScenarioContext) {
  await this.pages.loginPage.loginUsingCredential(
    this.testData.loginCredential.username,
    this.testData.loginCredential.password
  );
});

Then(
  'user should be able to login successfully',
  async function (this: ScenarioContext) {
    await this.pages.loginPage.validateSuccessfulLogin();
  }
);

Then(
  'invalid user error should appear',
  async function (this: ScenarioContext) {
    await this.pages.loginPage.validateLoginMessage(
      'Login was unsuccessful. Please correct the errors and try again.\n' +
        'The credentials provided are incorrect'
    );
  }
);

Then(
  '{string} message should appear',
  async function (this: ScenarioContext, message) {
    await this.pages.loginPage.validateLoginMessage(message);
  }
);
