import browser from "webextension-polyfill";

export const createNotification = (message: string): void => {
  browser.notifications.create({
    type: "basic",
    title: "Copy Guard",
    message,
    iconUrl: "icon128.png",
  });
};

export const isLinux = () => window.navigator.userAgent.indexOf("Linux") > -1;
