import browser from "webextension-polyfill";

export const createNotification = (message: string): void => {
  browser.notifications.create({
    type: "basic",
    title: "Copy Guard",
    message,
    iconUrl: "assets/images/icon128.png",
  });
};
