import { browser } from "webextension-polyfill-ts";

export default () => {
  const selection = window.getSelection().toString();

  if (selection) browser.runtime.sendMessage({ selection });
};
