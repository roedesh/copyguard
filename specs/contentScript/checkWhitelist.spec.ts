import browser from "webextension-polyfill";
import checkWhitelist from "../../src/contentScript/checkWhitelist";

const removeEventListenerSpy = jest.fn();
document.removeEventListener = removeEventListenerSpy;

browser.storage.sync.set({ whitelist: "www.example.com\nwww.exampletwo.com" });

describe("checkWhitelist", () => {
  beforeEach(() => {
    removeEventListenerSpy.mockClear();
  });

  describe("given the current domain is whitelisted", () => {
    it.each(["https://example.com", "https://www.example.com", "https://exampletwo.com", "https://www.exampletwo.com"])(
      "removes the copy event for url %s",
      async (url) => {
        window.location.assign(new URL(url));
        await checkWhitelist();

        expect(removeEventListenerSpy).toHaveBeenCalled();
      },
    );
  });

  describe("given the current domain is not whitelisted", () => {
    it("does not remove the copy event listener", async () => {
      window.location.assign(new URL("https://www.blacklisted.com"));
      await checkWhitelist();

      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });
});
