import browser from "webextension-polyfill";

type WarningType = "alteredClipboard" | "hiddenElements";

export const logWarning = (host: string, type: WarningType, selection: string, clipboard?: string) => {
  browser.storage.sync.get("log").then((result) => {
    const log = result?.log ?? [];
    log.push({
      host,
      type,
      selection,
      clipboard,
    });
    browser.storage.sync.set({ log });
  });
};
