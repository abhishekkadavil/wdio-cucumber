import { ChainablePromiseElement } from 'webdriverio';
import { expect } from 'chai';
import { wait } from '../helpers/wait-util.ts';
import allure from '@wdio/allure-reporter';

export class InteractionHelper {
  async verifyElementText(
    element: ChainablePromiseElement,
    expectedText: string
  ) {
    await wait.forElementEnabled(element);
    const actualText = await element.getText();

    try {
      expect(actualText).to.equal(expectedText);

      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        `PASS: verifyElementText - '${expectedText}'`,
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    } catch (error) {
      throw error; // re-throw so test still fails
    }
  }

  async verifyElementTextWithScreenShot(
    element: ChainablePromiseElement,
    expectedText: string
  ) {
    await wait.forElementEnabled(element);
    const actualText = await element.getText();

    try {
      expect(actualText).to.equal(expectedText);

      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        `PASS: verifyElementText - '${expectedText}'`,
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    } catch (error) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        `FAIL: verifyElementText - Expected '${expectedText}', got '${actualText}'`,
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
      throw error; // re-throw so test still fails
    }
  }

  async typeElement(
    element: ChainablePromiseElement,
    input: string,
    timeout: number = 10000
  ) {
    try {
      await element.waitForClickable({ timeout });
      await element.setValue(input);
      return element;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in typeElement: ${ex}`);
    }
  }

  async clickElement(
    element: ChainablePromiseElement,
    timeout: number = 10000
  ) {
    try {
      await element.waitForClickable({ timeout });
      await element.click();
      return element;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in clickElement: ${ex}`);
    }
  }

  async selectElementByText(
    element: ChainablePromiseElement,
    textToBeSelected: string,
    timeout: number = 10000
  ) {
    try {
      await element.waitForClickable({ timeout });
      await element.selectByVisibleText(textToBeSelected);
      return element;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in selectElementByText: ${ex}`);
    }
  }

  async selectElementByIndex(
    element: ChainablePromiseElement,
    index: number,
    timeout: number = 10000
  ) {
    try {
      await element.waitForClickable({ timeout });
      await element.selectByIndex(index);
      return element;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in selectElementByIndex: ${ex}`);
    }
  }

  async getText(
    element: ChainablePromiseElement,
    timeout: number = 10000
  ): Promise<string> {
    try {
      await element.waitForClickable({ timeout });
      return await element.getText();
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      return '';
    }
  }

  async getAttribute(
    element: ChainablePromiseElement,
    attName: string,
    timeout: number = 10000
  ): Promise<string> {
    try {
      await element.waitForClickable({ timeout });
      return await element.getAttribute(attName);
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      return '';
    }
  }

  async getTitle(): Promise<string> {
    try {
      return await browser.getTitle();
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      return '';
    }
  }

  async validateElementIsDisplayed(
    element: ChainablePromiseElement
  ): Promise<boolean> {
    try {
      return await element.isDisplayed();
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      return false;
    }
  }

  async switchToSecondWindowTab() {
    try {
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[1]);
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
    }
  }

  async switchToDefaultWindowTab() {
    try {
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[0]);
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
    }
  }
}
