import "jest-webextension-mock";
import browser from "webextension-polyfill";

/**
 * Reset the mocks for webextension-polyfill functions that we use before each test.
 * Typescript is ignored here, because the mockClear functions are not typed.
 */
beforeEach(() => {
  // @ts-ignore
  browser.notifications.create.mockClear();
  // @ts-ignore
  browser.runtime.sendMessage.mockClear();
});
