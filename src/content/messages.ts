import browser from "webextension-polyfill";
import type { ContentScriptMessage } from "../internal/types";

export const sendMessage = (message: ContentScriptMessage) => {
  browser.runtime.sendMessage(message);
};
