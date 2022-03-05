import browser from "webextension-polyfill";

export const createNotification = (message: string): void => {
  browser.notifications.create({
    type: "basic",
    title: "Copy Guard",
    message,
    iconUrl: "icon128.png",
  });
};

export const minifyString = (str: string) => str.replace(/\s/g, "");

export const removePrefixWWW = (hostname: string) => {
  if (hostname.startsWith("www.")) return hostname.replace("www.", "");
  return hostname;
};

export const groupBy = (items, key) => {
  return items.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const saveToFile = (data: any, filename: string, type: string) => {
  const file = new Blob([data], { type: type });

  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};
