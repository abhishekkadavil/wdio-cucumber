# WebdriverIO Cucumber boilerplate

This is a boilerplate for Cucumber webdriverIO for WEB automation

## Plugin Needed

- Prettier for formatting
  - ctrl + , -> search `singleQuote` enable singleQuote of prettier
- Live Server - for allure report opening we can do the same with `npx http-server ./allure-report` as well
- Cucumber (Gherkin) Full Support
  - ctrl + , -> will open the vs code user defined settings search for cucumber -> and edit the settings file - add cucumber.features, cucumber.glue paths

```json
"cucumber.features": [
   "features/feature-files/*.feature",
	],
	"cucumber.glue": [
   "features/step-definitions/*.ts",
	],
   "cucumberautocomplete.steps": [
        "features/step-definitions/*.ts",
    ],

```

## Tools used

- [WebdriverIO](https://webdriver.io/docs/gettingstarted)
  - Created new project using `npm init wdio@latest . `. If you want to configure existing project then run `npx wdio config`.
- Cucumber - BDD support
- Allure Reporting `npm install @wdio/allure-reporter --save-dev`
  - Config in reporters section of [wdio.conf.ts](wdio.conf.ts)
  - `npm i allure-commandline` - generate html from allure result
  - Execute `npx report` defined in [package.json](package.json) to generate report
- `npm install dotenv` env management
- `npm install winston` for log
- `npm install moment-timezone` - timezone conversion for log
- Chai - Assertion

  - `npm install --save-dev chai`
  - `npm install --save-dev @types/chai`

#### Other packages to install

- `npm install --save-dev @wdio/types` - To use `$` in `$('~email')`

## Why

- Why WebdriverIO? Why not something like Selenium
  - It’s faster to set up and has a much better DX if you're using JS/TS.
  - Can be used to test web and mobile(Appium + WDIO).
  - You don't manually manage the driver instance in the test code.
  - WebdriverIO internally manages the session and the driver(Both appium server and browser) for you — automatically per test, per session.
    - When you do: `await $('~username').setValue('some user');`.WebdriverIO automatically knows which driver/session to send the command to. You never need to explicitly pass the driver object around.

## How

### Browser management

Browser is managed in [wdio.conf.ts](wdio.conf.ts). If there is no `--browser` argument in CLI then the code will check the `BROWSER` in [.env](.env) file. If we want to execute some scenario in only specific browser, then we can add specific cucumber tag to that scenario and execute in one go.

**Note: Firefox**
Since in my local i have installed the firefox using snap its not working hence i hardcoded the firefox path. Download firefox from https://www.mozilla.org/en-US/firefox/all/#product-desktop-release.

### Test data

Test data is managed through json files. Below step is used to inject test data into the test.

```feature
Given user is on home page and test data present in "/FirstTimeOrder/Scenario01.json"
```

[data-reader](features/utils/data-reader.ts) handles the test data reading logic.

### Context management

Contest management is done through [scenario-context](features/utils/scenario-context.ts) with help of [cucumber-js world](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md). In scenario-context the test data will be stored and managed by `testData` and other data that shared between steps in a scenario are shared though `runtimeData`.

Page objects are also shared through [scenario-context](features/utils/scenario-context.ts).

**Here is how we share the data between steps**

```feature
# Save data in scenario context
Then Save order number in scenario context key 'orderNumber'

# Retrieve the saved data in scenario context
Then I search for the created order from scenario context key 'orderNumber'
```

## Reporting

For reporting we are using allure reporting. Report section of [wdio.conf.ts](wdio.conf.ts) is where we configure different report. In the current project we configured `spec` and `allure` reporting.

After the test execution we need to run `npm run report` to generate report. the spec reporting logs will be present in the [logs](logs) folder.

For opening the allure report we need a live server. We can use either live server plugin in vscode(right lick on the index.html -> open with live server) or we can use `npx http-server ./allure-report`.

Screenshots are added in `afterStep` of [wdio.conf.ts hooks](wdio.conf.ts). There is no particular reason for using [wdio.conf.ts hooks](wdio.conf.ts) instead of [cucumber hooks](features/step-definitions/hooks.ts). We can also enable allure screenshot in reporters -> disableWebdriverScreenshotsReporting section of [wdio.conf.ts hooks](wdio.conf.ts). Also the for every assertion we are taking a screenshot this logic is present in the [interaction-helper.ts](features/helpers/interaction-helper.ts).

We can also add categories in allure reporting as well. The implementation is in [hooks.ts](features/step-definitions/hooks.ts). Usage is in [Login.feature](features/feature-files/Login.feature).

We can test info like below - [Reference](https://webdriver.io/docs/allure-reporter#supported-allure-api).

```ts
import allureReporter from '@wdio/allure-reporter';

Then('Select the product', async function (this: ScenarioContext) {
  for (const item of this.testData.items) {
    await HomePage.selectProduct(item.name);
  }
  allureReporter.addFeature('Feature_name');
  allureReporter.addStory('Story_name');
});
```

## Log

Logs will be generated in [logs](logs) folder.

We are using winston for logging. Implementation is present in [logger.ts](features/utils/logger.ts). We can use the logger as below-

```ts
import logger from '../utils/logger';
Before(async () => {
  logger.info('Starting Scenario...');
});
```

## Configuration

Configuration is done though [.env](.env) file. The data is initialized in staring of the execution in [wdio.conf.ts](wdio.conf.ts) by using below command

```ts
import * as dotenv from 'dotenv';
dotenv.config();
```

After that we use [env.ts](features/utils/env.ts) to load env data and use everywhere. usage eg: [wait-util.ts](features/helpers/wait-util.ts)

## Execution flow

### Execution

- Run `npm run smoke` to execute tests through [package.json](package.json).(instead of smoke we can define any value in package.json)
- Generate undefined steps using `npx cucumber-js ./features/feature-files/place-order.feature`
- Execute specif tags
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke"`
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke and @login"`
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke or @regression"`
- write spec report to file or execute `npm run spec`, if you want to append the spec log use `wdio run ./wdio.conf.ts >> logs/spec-output.log 2>&1` or `spec-append`

### Pre test

Folder cleanup task will be done through [pre-test.ts](features/utils/pre-test.ts) this is called before executing the test in [package.json](package.json). we have added pre script in every execution.

Apart from the webdriver hook we also have [cucumber hooks](features/step-definitions/hooks.ts) as well, which help to manage category in report. We can also use this to perform any other tasks in future as well.

### Execution

Execution will be start from [wdio.conf.ts](wdio.conf.ts).

- The [Test data](#test-data) will be injected to the test.
- The test data from json are stored in the [testData](features/utils/scenario-context.ts) and used across different steps of the test scenario.

### Browser specific

[Browser management](#browser-management)

### Retry

- Spec File Level Retry: `specFileRetries` in [wdio.conf.ts](wdio.conf.ts)
- Test/Scenario Level Retry: `retry` in `cucumberOpts` of [wdio.conf.ts](wdio.conf.ts)

### Parallel execution

WDIO natively does not support scenario level parallelism only support feature level parallelism.
