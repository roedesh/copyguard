import browser from "webextension-polyfill";

type WarningType = "alteredClipboard" | "hiddenElements";

export const logWarning = (host: string, type: WarningType, selection: string, clipboard?: string) => {
  browser.storage.sync.get("warnings").then((result) => {
    const warnings = result?.warnings ?? {};
    warnings[host] = warnings[host] ?? [];
    warnings[host].push({
      type,
      selection,
      clipboard,
    });
    browser.storage.sync.set({ warnings });
  });
};
