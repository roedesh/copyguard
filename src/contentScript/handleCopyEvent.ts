import { browser } from "webextension-polyfill-ts";

const isSelectionGoingOffscreen = (selection: Selection): boolean => {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return rect.x < 0 || rect.y < 0 || rect.x > window.innerWidth || rect.y > window.innerHeight;
};

export default () => {
  const selection = window.getSelection();
  const selectionString = selection.toString();
  const isGoingOffscreen = isSelectionGoingOffscreen(selection);

  if (selectionString)
    browser.runtime.sendMessage({ selection: selectionString, isSelectionGoingOffscreen: isGoingOffscreen });
};
