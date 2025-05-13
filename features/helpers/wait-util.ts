// wait.utils.ts
import { ChainablePromiseElement } from 'webdriverio';
import { config as wdioConfig } from '../../wdio.conf.ts';
import { EnvConfig } from '../utils/env.ts';

const DEFAULT_TIMEOUT =
  Number(EnvConfig.ELEMENT_WAIT_TIMEOUT) || Number(wdioConfig.waitforTimeout);

// Element-based waits
export async function waitForElementDisplayed(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await element.waitForDisplayed({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not displayed after ${timeout}ms`,
  });
}

export async function waitForElementHidden(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await element.waitForDisplayed({
    reverse: true,
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} still displayed after ${timeout}ms`,
  });
}

export async function waitForElementExist(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await element.waitForExist({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not existing after ${timeout}ms`,
  });
}

export async function waitForElementNotExist(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await element.waitForExist({
    reverse: true,
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} still exists after ${timeout}ms`,
  });
}

export async function waitForElementEnabled(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await element.waitForEnabled({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not enabled after ${timeout}ms`,
  });
}

// Web-specific waits

export async function waitForUrlToContain(
  expectedPart: string,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(expectedPart),
    {
      timeout,
      timeoutMsg:
        timeoutMsg ||
        `URL did not contain "${expectedPart}" after ${timeout}ms`,
    }
  );
}

export async function waitForTitleToContain(
  expectedPart: string,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await browser.waitUntil(
    async () => (await browser.getTitle()).includes(expectedPart),
    {
      timeout,
      timeoutMsg:
        timeoutMsg ||
        `Title did not contain "${expectedPart}" after ${timeout}ms`,
    }
  );
}

export async function waitForAttributeValue(
  element: ChainablePromiseElement,
  attribute: string,
  expectedValue: string,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await browser.waitUntil(
    async () => (await element.getAttribute(attribute)) === expectedValue,
    {
      timeout,
      timeoutMsg:
        timeoutMsg ||
        `Attribute "${attribute}" did not equal "${expectedValue}" after ${timeout}ms`,
    }
  );
}

export async function waitForCssValue(
  element: ChainablePromiseElement,
  cssProperty: string,
  expectedValue: string,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await browser.waitUntil(
    async () =>
      (await element.getCSSProperty(cssProperty)).value === expectedValue,
    {
      timeout,
      timeoutMsg:
        timeoutMsg ||
        `CSS property "${cssProperty}" did not equal "${expectedValue}" after ${timeout}ms`,
    }
  );
}

export async function waitForElementCount(
  elements: () => Promise<WebdriverIO.ElementArray>,
  expectedCount: number,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await browser.waitUntil(
    async () => (await elements()).length === expectedCount,
    {
      timeout,
      timeoutMsg:
        timeoutMsg ||
        `Expected ${expectedCount} elements but got different count`,
    }
  );
}

export async function waitForPageLoadComplete(
  timeout: number = DEFAULT_TIMEOUT
): Promise<void> {
  await browser.waitUntil(
    async () =>
      (await browser.execute(() => document.readyState)) === 'complete',
    {
      timeout,
      timeoutMsg: `Page did not reach 'complete' state after ${timeout}ms`,
    }
  );
}

// Wait for element to be clickable
export async function waitForElementClickable(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  await element.waitForClickable({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not clickable after ${timeout}ms`,
  });
}

// Wait for element to become stable (no CSS transformations)
export async function waitForElementStable(
  element: ChainablePromiseElement,
  timeout: number = DEFAULT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  const initialTransform = await element.getCSSProperty('transform');

  await browser.waitUntil(
    async () => {
      const currentTransform = await element.getCSSProperty('transform');
      return currentTransform.value === initialTransform.value;
    },
    {
      timeout,
      timeoutMsg:
        timeoutMsg ||
        `Element ${element.selector} did not become stable after ${timeout}ms`,
    }
  );
}

// Export all waits as a grouped utility
export const wait = {
  forDisplayed: waitForElementDisplayed,
  forElementHidden: waitForElementHidden,
  forExist: waitForElementExist,
  forElementNotExist: waitForElementNotExist,
  forElementEnabled: waitForElementEnabled,

  forUrlToContain: waitForUrlToContain,
  forTitleToContain: waitForTitleToContain,
  forAttributeValue: waitForAttributeValue,
  forCssValue: waitForCssValue,
  forElementCount: waitForElementCount,
  forPageLoadComplete: waitForPageLoadComplete,
  forElementClickable: waitForElementClickable,
  waitForElementStable: waitForElementStable,
};
