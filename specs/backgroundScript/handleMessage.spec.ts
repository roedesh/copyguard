import browser from "webextension-polyfill";
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

    handleMessage({ selection: "Differenttext", hasHiddenElementsInSelection: false });

    expect(browser.notifications.create).toHaveBeenCalledWith({
      type: "basic",
      title: "Copy Guard",
      message: Notifications.ALTERED_CLIPBOARD_DATA,
      iconUrl: "icon128.png",
    });
  });

  it("given hasHiddenElementsInSelection is true, triggers a warning for hidden text content", () => {
    setupBody();

    handleMessage({ selection: "Sometext", hasHiddenElementsInSelection: true });

    expect(browser.notifications.create).toHaveBeenCalledWith({
      type: "basic",
      title: "Copy Guard",
      message: Notifications.HIDDEN_ELEMENTS_FOUND,
      iconUrl: "icon128.png",
    });
  });

  it("given the text selection is equal to clipboard data, does not trigger a warning", () => {
    setupBody();

    handleMessage({ selection: "Sometext", hasHiddenElementsInSelection: false });

    expect(browser.notifications.create).not.toHaveBeenCalled();
  });
});
