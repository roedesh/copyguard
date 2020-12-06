import { browser } from "webextension-polyfill-ts";

type ContentScriptMessage = {
  selection: string;
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

export default ({ selection }: ContentScriptMessage): void => {
  const clipboardContent = getContentFromClipboard();
  const isDifferentFromSelection = clipboardContent !== selection;

  if (isDifferentFromSelection) {
    browser.notifications.create({
      type: "basic",
      title: "Copy Guard",
      message: "Your copy action was hijacked!",
      iconUrl: "icon128.png",
    });
  }
};
