import { browser } from "webextension-polyfill-ts";

const getElementsInSelection = (selection: Selection): Element[] => {
  const range = selection.getRangeAt(0);
  const parentNode = range.commonAncestorContainer.parentNode as HTMLElement;
  const children = Array.from(parentNode.getElementsByTagName("*"));
  const elementsInSelection = children.filter((element) => selection.containsNode(element));

  return elementsInSelection;
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
  const elementsInSelection = getElementsInSelection(selection);
  const hasHiddenElementsInSelection = !!elementsInSelection.find(isHiddenElement);

  if (selectionString)
    browser.runtime.sendMessage({
      selection: selectionString,
      hasHiddenElementsInSelection,
    });
};
