import browser from "webextension-polyfill";

export const createNotification = (message: string): void => {
  browser.notifications.create({
    type: "basic",
    title: "Copy Guard",
    message,
    priority: 2,
    iconUrl: "/assets/icon128.png",
  });
};
