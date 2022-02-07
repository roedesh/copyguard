import browser from "webextension-polyfill";
import handleCopyEvent from "./handleCopyEvent";
import { removePrefixWWW } from "../utils";

export default async () => {
  const result = await browser.storage.sync.get("whitelist");
  const domain = removePrefixWWW(window.location.hostname);
  const resultLines: string[] = (result.whitelist as string).split("\n");

  if (resultLines.find((domainFromList) => removePrefixWWW(domainFromList.trim()) === domain)) {
    document.removeEventListener("copy", handleCopyEvent);
  }
};
