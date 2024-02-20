import browser from "webextension-polyfill";
import { writable, get } from "svelte/store";

type Storage = {
  warnings: Record<
    string,
    { type: string; selection: string; clipboard: string }[]
  >;
  whitelist: string;
};

const browserStorage = (await browser.storage.sync.get({
  warnings: {},
  whitelist: "",
})) as Storage;

export const storage = writable(browserStorage);
export const updateStorage = async (callback: (state: Storage) => Storage) => {
  const updatedState = callback(get(storage));

  storage.update(() => updatedState);
  await browser.storage.sync.set(updatedState);
};
