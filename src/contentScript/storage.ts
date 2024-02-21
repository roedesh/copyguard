import browser from "webextension-polyfill";

import { removePrefixWWW } from "../internal/strings";

export const checkWhitelist = async (
  hostname: string,
  eventHandler: (event: ClipboardEvent) => void,
) => {
  const whitelist = (await browser.storage.sync.get("whitelist"))
    .whitelist as string;

  if (whitelist) {
    const domain = removePrefixWWW(hostname);
    const resultLines: string[] = whitelist.split("\n");

    if (
      resultLines.find(
        (domainFromList) => removePrefixWWW(domainFromList.trim()) === domain,
      )
    ) {
      console.info("🛡️ This domain is whitelisted by Copy Guard!");
      document.removeEventListener("copy", eventHandler);
    }
  }
};
