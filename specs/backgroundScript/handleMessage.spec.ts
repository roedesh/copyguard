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
  it("given the text selection is different from clipboard data, fires a notification", () => {
    setupBody();

    mockBrowser.notifications.create.expect({
      type: "basic",
      title: "Copy Guard",
      message: Notifications.ALTERED_CLIPBOARD_DATA,
      iconUrl: "icon128.png",
    });

    handleMessage({ selection: "Different text", isSelectionGoingOffscreen: false });
  });

  it("given the text selection is equal to clipboard data, does not fire a notification", () => {
    setupBody();

    handleMessage({ selection: "Some text", isSelectionGoingOffscreen: false });

    expect(mockBrowser.notifications.create.getMockCalls().length).toBe(0);
  });

  it("given isSelectionGoingOffscreen is true, fires a notification", () => {
    setupBody();

    mockBrowser.notifications.create.expect({
      type: "basic",
      title: "Copy Guard",
      message: Notifications.OFFSCREEN_ELEMENTS_FOUND,
      iconUrl: "icon128.png",
    });

    handleMessage({ selection: "Some text", isSelectionGoingOffscreen: true });
  });
});
