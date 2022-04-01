import { createNotification } from "../utils/browser";
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

export default ({ domain, selection, hasHiddenElementsInSelection }: ContentScriptMessage): void => {
  if (selection) {
    if (hasHiddenElementsInSelection) {
      createNotification("There are hidden elements in your text selection!");
      logWarning(domain, "hiddenElements", selection);
      return;
    }

    const clipboardContent = getContentFromClipboard();
    const isDifferentFromSelection = minifyString(clipboardContent) !== minifyString(selection);

    if (isDifferentFromSelection) {
      createNotification("Your clipboard data was altered by Javascript!");
      logWarning(domain, "alteredClipboard", selection, clipboardContent);
    }
  }
};
