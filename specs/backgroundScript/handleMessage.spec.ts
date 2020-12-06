import handleMessage from "../../src/backgroundScript/handleMessage";

document.execCommand = jest.fn().mockImplementation(() => {
  const sandbox = document.getElementById("sandbox") as HTMLTextAreaElement;
  sandbox.value = "Some text";
  return "Some text";
});

const setupBody = () => {
  document.body.innerHTML = `<textarea id="sandbox" />`;
};

describe("handleMessage", () => {
  it("given the text selection is different from clipboard data, fires a notification", () => {
    setupBody();

    mockBrowser.notifications.create.expect({
      type: "basic",
      title: "Copy Guard",
      message: "Your copy action was hijacked!",
      iconUrl: "icon128.png",
    });

    handleMessage({ selection: "Different text" });
  });

  it("given the text selection is equal to clipboard data, does not fire a notification", () => {
    setupBody();

    handleMessage({ selection: "Some text" });

    expect(mockBrowser.notifications.create.getMockCalls().length).toBe(0);
  });
});
