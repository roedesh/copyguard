import browser from "webextension-polyfill";
import handleCopyEvent from "./handleCopyEvent";
import { removePrefixWWW } from "../utils/strings";

export default async () => {
  const whitelist = (await browser.storage.sync.get("whitelist")).whitelist as string;
  if (whitelist) {
    const domain = removePrefixWWW(window.location.hostname);
    const resultLines: string[] = whitelist.split("\n");

    if (resultLines.find((domainFromList) => removePrefixWWW(domainFromList.trim()) === domain)) {
      document.removeEventListener("copy", handleCopyEvent);
    }
  }
};
