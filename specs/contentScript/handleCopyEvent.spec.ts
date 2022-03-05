import browser from "webextension-polyfill";
import handleCopyEvent from "../../src/contentScript/handleCopyEvent";

const setupBody = () => {
  document.body.innerHTML = `<div><p>Text to select</p></div>`;
  const paragraph = document.querySelector("p");
  paragraph.getBoundingClientRect = jest.fn().mockReturnValue({
    width: 100,
    height: 25,
  });
};

const selectElement = (querySelector: string): void => {
  const range = window.document.createRange();
  const element = document.querySelector(querySelector);
  range.selectNode(element);
  window.getSelection().empty();
  window.getSelection().addRange(range);
};

describe("handleCopyEvent", () => {
  beforeEach(() => {
    (browser.runtime.sendMessage as jest.Mock).mockClear();
  });

  it("given a text selection, calls sendMessage", async () => {
    window.location.assign(new URL("https://example.com"));
    setupBody();
    selectElement("p");

    handleCopyEvent();

    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({
      domain: "example.com",
      selection: "Text to select",
      hasHiddenElementsInSelection: false,
    });
  });

  it("given no text selection, does not call sendMessage", async () => {
    setupBody();

    handleCopyEvent();

    expect(browser.runtime.sendMessage).not.toHaveBeenCalled();
  });
});
