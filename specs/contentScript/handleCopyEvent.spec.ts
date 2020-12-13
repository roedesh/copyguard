import handleCopyEvent from "../../src/contentScript/handleCopyEvent";

const setupBody = (extraHTML = "") => {
  document.body.innerHTML = `<div><p>Text to select${extraHTML}</p></div>`;
};

const selectElement = (querySelector: string): void => {
  const range = window.document.createRange();
  const element = document.querySelector(querySelector);
  range.selectNode(element);
  window.getSelection().empty();
  window.getSelection().addRange(range);
};

describe("handleCopyEvent", () => {
  it("given a text selection, calls sendMessage", async () => {
    setupBody();
    selectElement("p");

    mockBrowser.runtime.sendMessage.expect({ selection: "Text to select", hasHiddenElementsInSelection: false });

    handleCopyEvent();
  });

  it("given a text selection with hidden contents, calls sendMessage with hasHiddenElementsInSelection set to true", async () => {
    setupBody(`<span style="font-size: 0px;">hidden text</span>`);
    selectElement("p");

    mockBrowser.runtime.sendMessage.expect({
      selection: "Text to selecthidden text",
      hasHiddenElementsInSelection: true,
    });

    handleCopyEvent();
  });

  it("given no text selection, does not call sendMessage", async () => {
    setupBody();
    handleCopyEvent();

    expect(mockBrowser.runtime.sendMessage.getMockCalls().length).toBe(0);
  });
});
