import { browser } from "webextension-polyfill-ts";
import { createNotification } from "./utils";

type ContentScriptMessage = {
  selection: string;
  isSelectionGoingOffscreen: boolean;
};

export enum Notifications {
  ALTERED_CLIPBOARD_DATA = "Javascript altered your clipboard data!",
  OFFSCREEN_ELEMENTS_FOUND = "There were offscreen elements in your text selection!",
}

const getContentFromClipboard = (): string => {
  const sandbox = document.getElementById("sandbox") as HTMLTextAreaElement;
  sandbox.value = "";
  sandbox.select();

  if (document.execCommand("paste")) {
    const result = sandbox.value;
    sandbox.value = "";
    return result;
  }

  return "";
};

export default ({ selection, isSelectionGoingOffscreen }: ContentScriptMessage): void => {
  if (isSelectionGoingOffscreen) {
    createNotification(Notifications.OFFSCREEN_ELEMENTS_FOUND);
    return;
  }

  const clipboardContent = getContentFromClipboard();
  const isDifferentFromSelection = clipboardContent !== selection;

  if (isDifferentFromSelection) createNotification(Notifications.ALTERED_CLIPBOARD_DATA);
};
