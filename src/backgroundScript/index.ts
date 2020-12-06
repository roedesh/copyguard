import { browser } from "webextension-polyfill-ts";
import handleMessage from "./handleMessage";

browser.runtime.onMessage.addListener(handleMessage);
