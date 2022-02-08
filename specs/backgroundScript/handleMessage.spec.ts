import browser from "webextension-polyfill";
import handleMessage from "../../src/backgroundScript/handleMessage";

document.execCommand = jest.fn().mockImplementation(() => {
  const sandbox = document.getElementById("sandbox") as HTMLTextAreaElement;
  sandbox.value = "Some text";
  return "Some text";
});

const setupBody = () => {
  document.body.innerHTML = `<textarea id="sandbox"></textarea>`;
};

describe("handleMessage", () => {
  beforeEach(() => {
    (browser.notifications.create as jest.Mock).mockClear();
  });

  it("triggers a warning for altered clipboard data", () => {
    setupBody();

    handleMessage({ selection: "Differenttext", hasHiddenElementsInSelection: false });

    expect(browser.notifications.create).toHaveBeenCalledWith({
      type: "basic",
      title: "Copy Guard",
      message: "Your clipboard data was altered by Javascript!",
      iconUrl: "icon128.png",
    });
  });

  it("triggers a warning for hidden text content", () => {
    setupBody();

    handleMessage({ selection: "Sometext", hasHiddenElementsInSelection: true });

    expect(browser.notifications.create).toHaveBeenCalledWith({
      type: "basic",
      title: "Copy Guard",
      message: "There are hidden elements in your text selection!",
      iconUrl: "icon128.png",
    });
  });

  it("given nothing is wrong, does not trigger a warning", () => {
    setupBody();

    handleMessage({ selection: "Sometext", hasHiddenElementsInSelection: false });

    expect(browser.notifications.create).not.toHaveBeenCalled();
  });
});
