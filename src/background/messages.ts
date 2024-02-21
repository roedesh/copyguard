import type { ContentScriptMessage } from "../internal/types";
import { createNotification } from "./notifications";
import { logWarningToStorage } from "./storage";

export const handleMessage = ({
  domain,
  clipboardData,
  selection,
  hasHiddenElementsInSelection,
}: ContentScriptMessage): void => {
  if (hasHiddenElementsInSelection) {
    createNotification("There are hidden elements in your text selection!");
    logWarningToStorage(domain, "hiddenElements", selection);
    return;
  }

  if (clipboardData) {
    createNotification("Your clipboard data has been altered!");
    logWarningToStorage(domain, "alteredClipboard", selection, clipboardData);
  }
};
