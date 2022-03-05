import browser from "webextension-polyfill";
import { removePrefixWWW } from "../utils";

const getElementsInSelection = (selection: Selection): HTMLElement[] => {
  const range = selection.getRangeAt(0);
  const parentNode = range.commonAncestorContainer.parentNode as HTMLElement;
  const children = Array.from(parentNode.getElementsByTagName("*"));
  const elementsInSelection = children.filter((element) => selection.containsNode(element));

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

export default () => {
  const selection = window.getSelection();
  const selectionString = selection.toString();

  if (selectionString) {
    const elementsInSelection = getElementsInSelection(selection);
    const elementsWithText = elementsInSelection.filter((element: HTMLElement) => element.innerText)
    const hasHiddenElementsInSelection = !!elementsWithText.find(isHiddenElement);

    browser.runtime.sendMessage({
      domain: removePrefixWWW(window.location.hostname),
      selection: selectionString,
      hasHiddenElementsInSelection,
    });
  }
};
