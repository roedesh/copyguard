import browser from "webextension-polyfill";
import { handleMessage } from "./messages";

browser.runtime.onMessage.addListener(handleMessage);
