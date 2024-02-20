import { removePrefixWWW } from "../internal/strings";
import { sendMessage } from "./messages";

const getElementsInSelection = (selection: Selection): HTMLElement[] => {
  const range = selection.getRangeAt(0);
  const parentNode = range.commonAncestorContainer.parentNode as HTMLElement;
  const children = Array.from(parentNode.getElementsByTagName("*"));
  const elementsInSelection = children.filter((element) =>
    selection.containsNode(element),
  );

  return elementsInSelection as HTMLElement[];
};

const isHiddenElement = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();

  return (
    rect.width === 0 ||
    rect.height === 0 ||
    rect.x < 0 ||
    rect.y < 0 ||
    rect.x > window.innerWidth ||
    rect.y > window.innerHeight
  );
};

export const handleCopyEvent = (event: ClipboardEvent) => {
  const selection = window.getSelection();
  const selectionString = selection?.toString() ?? "";

  /**
   * Normally the clipboard data is not accessible in the 'copy' event. However, if the clipboard
   * data was altered by Javascript, it will be accessible. This means that all we have to do is
   * check if there is anything in the clipboard.
   */
  const clipboardData = event.clipboardData?.getData("text") || "";
  if (clipboardData) {
    sendMessage({
      domain: removePrefixWWW(window.location.hostname),
      clipboardData,
      selection: selectionString,
      hasHiddenElementsInSelection: false,
    });
    return;
  }

  if (selection) {
    const elementsInSelection = getElementsInSelection(selection);
    const elementsWithText = elementsInSelection.filter(
      (element: HTMLElement) => element.innerText,
    );
    const hasHiddenElementsInSelection =
      !!elementsWithText.find(isHiddenElement);

    if (hasHiddenElementsInSelection) {
      sendMessage({
        domain: removePrefixWWW(window.location.hostname),
        clipboardData,
        selection: selectionString,
        hasHiddenElementsInSelection: true,
      });
      return;
    }
  }
};
