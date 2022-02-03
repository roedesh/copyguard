import browser from "webextension-polyfill";
import handleCopyEvent from "./handleCopyEvent";
import { removePrefixWWW } from "../utils";

// Add event listener regardless of whitelisted domain, to ensure this script
// is run as soon as possible. If the current domain is whitelisted, we simply
// remove the event listener.
document.addEventListener("copy", handleCopyEvent);

browser.storage.sync.get("whitelist").then((result) => {
  const domain = removePrefixWWW(window.location.hostname);
  const resultLines: string[] = (result.whitelist as string).split("\n");

  if (resultLines.find((domainFromList) => removePrefixWWW(domainFromList) === domain)) {
    document.removeEventListener("copy", handleCopyEvent);
  }
});
