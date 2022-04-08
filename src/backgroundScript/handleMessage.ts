import { createNotification, isLinux } from "../utils/browser";
import { minifyString } from "../utils/strings";
import { logWarning } from "./logger";

type ContentScriptMessage = {
  domain: string;
  selection: string;
  hasHiddenElementsInSelection: boolean;
};

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

const checkIsDifferentFromSelection = (clipboardContent: string, selection: string) => {
  const minClipboardContent = minifyString(clipboardContent);
  const minSelection = minifyString(selection);

  if (isLinux()) {
    // Linux handles selections and clipboard data in a different way, which sometimes
    // causes the selection and clipboard data to not be synchronized. So for Linux only
    // we also check if the selection does not contain the clipboard data, and vice versa.
    //
    // For more info see https://github.com/roedesh/copyguard/issues/10
    return (
      minClipboardContent !== minSelection ||
      !minSelection.includes(minClipboardContent) ||
      !minClipboardContent.includes(minSelection)
    );
  }

  return minClipboardContent !== minSelection;
};

export default ({ domain, selection, hasHiddenElementsInSelection }: ContentScriptMessage): void => {
  if (selection) {
    if (hasHiddenElementsInSelection) {
      createNotification("There are hidden elements in your text selection!");
      logWarning(domain, "hiddenElements", selection);
      return;
    }

    const clipboardContent = getContentFromClipboard();
    const isDifferentFromSelection = checkIsDifferentFromSelection(clipboardContent, selection);

    if (isDifferentFromSelection) {
      createNotification("Your clipboard data was altered by Javascript!");
      logWarning(domain, "alteredClipboard", selection, clipboardContent);
    }
  }
};
