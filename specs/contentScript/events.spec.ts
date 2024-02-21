import browser from "webextension-polyfill";
import { handleCopyEvent } from "../../src/contentScript/events";

const setupBody = () => {
  document.body.innerHTML = `<div><p>Text to select</p></div>`;
  const paragraph = document.querySelector("p") as HTMLParagraphElement;
  paragraph.getBoundingClientRect = jest.fn().mockReturnValue({
    width: 100,
    height: 25,
  });
};

const selectElement = (querySelector: string): void => {
  const range = window.document.createRange();
  const element = document.querySelector(querySelector) as Element;
  range.selectNode(element);
  window.getSelection()?.empty();
  window.getSelection()?.addRange(range);
};

const mockCopyEvent = (text: string) => {
  const event = new Event("copy") as any;
  event.clipboardData = {
    getData() {
      return text;
    },
  };
  return event as ClipboardEvent;
};

describe("handleCopyEvent", () => {
  beforeEach(() => {
    (browser.runtime.sendMessage as jest.Mock).mockClear();
  });

  it("given a text selection, calls sendMessage", async () => {
    setupBody();
    selectElement("p");
    handleCopyEvent(
      mockCopyEvent("Text to select")
    );

    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({
      clipboardData: "Text to select",
      domain: "localhost",
      selection: "Text to select",
      hasHiddenElementsInSelection: false,
    });
  });

  it("given no text selection, does not call sendMessage", async () => {
    setupBody();
    selectElement("p");

    handleCopyEvent(
      mockCopyEvent("")
    );

    expect(browser.runtime.sendMessage).not.toHaveBeenCalled();
  });
});
