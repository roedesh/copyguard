import browser from "webextension-polyfill";
import handleMessage from "./handleMessage";

browser.runtime.onMessage.addListener(handleMessage);
