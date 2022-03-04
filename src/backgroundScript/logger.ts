import browser from "webextension-polyfill";

type WarningType = "alteredClipboard" | "hiddenElements";

export const logWarning = (host: string, type: WarningType, selection: string, clipboard?: string) => {
  browser.storage.sync.get("log").then((result) => {
    const log = result?.log ?? {};
    log[host] = log[host] ?? [];
    log[host].push({
      type,
      selection,
      clipboard,
    });
    browser.storage.sync.set({ log });
  });
};
