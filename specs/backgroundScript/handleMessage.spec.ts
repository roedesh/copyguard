import browser from "webextension-polyfill";
import { handleMessage } from "../../src/background/messages";

describe("handleMessage", () => {
  beforeEach(() => {
    (browser.notifications.create as jest.Mock).mockClear();
  });

  it("triggers a warning for altered clipboard data", () => {
    handleMessage({
      domain: "example.com",
      clipboardData: "text",
      selection: "text",
      hasHiddenElementsInSelection: false,
    });

    expect(browser.notifications.create).toHaveBeenCalledWith({
      type: "basic",
      title: "Copy Guard",
      message: "Your clipboard data has been altered!",
      iconUrl: "/assets/icon128.png",
      priority: 2,
    });
  });

  it("triggers a warning for hidden text content", () => {
    handleMessage({
      domain: "example.com",
      selection: "Sometext",
      hasHiddenElementsInSelection: true,
    });

    expect(browser.notifications.create).toHaveBeenCalledWith({
      type: "basic",
      title: "Copy Guard",
      message: "There are hidden elements in your text selection!",
      iconUrl: "/assets/icon128.png",
      priority: 2,
    });
  });
});
