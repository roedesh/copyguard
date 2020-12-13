import handleMessage, { Notifications } from "../../src/backgroundScript/handleMessage";

document.execCommand = jest.fn().mockImplementation(() => {
  const sandbox = document.getElementById("sandbox") as HTMLTextAreaElement;
  sandbox.value = "Some text";
  return "Some text";
});

const setupBody = () => {
  document.body.innerHTML = `<textarea id="sandbox"></textarea>`;
};

describe("handleMessage", () => {
  it("given the text selection is different from clipboard data, triggers a warning for altered clipboard data", () => {
    setupBody();

    mockBrowser.notifications.create.expect({
      type: "basic",
      title: "Copy Guard",
      message: Notifications.ALTERED_CLIPBOARD_DATA,
      iconUrl: "icon128.png",
    });

    handleMessage({ selection: "Different text", hasHiddenElementsInSelection: false });
  });

  it("given hasHiddenElementsInSelection is true, triggers a warning for hidden text content", () => {
    setupBody();

    mockBrowser.notifications.create.expect({
      type: "basic",
      title: "Copy Guard",
      message: Notifications.HIDDEN_ELEMENTS_FOUND,
      iconUrl: "icon128.png",
    });

    handleMessage({ selection: "Some text", hasHiddenElementsInSelection: true });
  });

  it("given the text selection is equal to clipboard data, does not trigger a warning", () => {
    setupBody();

    handleMessage({ selection: "Some text", hasHiddenElementsInSelection: false });

    expect(mockBrowser.notifications.create.getMockCalls().length).toBe(0);
  });
});
