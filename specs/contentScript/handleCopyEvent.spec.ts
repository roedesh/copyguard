import handleCopyEvent from "../../src/contentScript/handleCopyEvent";

const setupBody = () => {
  document.body.innerHTML = `<div><p>Text to select</p></div>`;
};

const selectText = (window: Window, element: Node): void => {
  const range = window.document.createRange();
  range.selectNode(element);
  window.getSelection().addRange(range);
};

describe("handleCopyEvent", () => {
  it("given a text selection, calls sendMessage when the copy event is fired", async () => {
    setupBody();

    const paragraph = window.document.querySelector("p");
    selectText(window, paragraph);

    mockBrowser.runtime.sendMessage.expect({ selection: "Text to select" });

    handleCopyEvent();
  });

  it("given no text selection, does not call sendMessage when the copy event is fired", async () => {
    setupBody();
    handleCopyEvent();

    expect(mockBrowser.runtime.sendMessage.getMockCalls().length).toBe(0);
  });
});
