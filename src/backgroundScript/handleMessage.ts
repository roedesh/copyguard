import { createNotification, minifyString } from "../utils";

type ContentScriptMessage = {
  selection: string;
  hasHiddenElementsInSelection: boolean;
};

export enum Notifications {
  ALTERED_CLIPBOARD_DATA = "Your clipboard data was altered by Javascript!",
  HIDDEN_ELEMENTS_FOUND = "There are hidden elements in your text selection!",
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

export default ({ selection, hasHiddenElementsInSelection }: ContentScriptMessage): void => {
  if (selection) {
    if (hasHiddenElementsInSelection) {
      createNotification(Notifications.HIDDEN_ELEMENTS_FOUND);
      return;
    }

    const clipboardContent = getContentFromClipboard();
    const isDifferentFromSelection = minifyString(clipboardContent) !== minifyString(selection);

    if (isDifferentFromSelection) createNotification(Notifications.ALTERED_CLIPBOARD_DATA);
  }
};
