import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import browser from "webextension-polyfill";

type Warning = {
  type: string;
  selection: string;
  clipboard: string;
};

export type DomainWarningMapping = {
  [domain: string]: Warning[];
};

type Settings = {
  whitelist: string;
};

type StorageContext = {
  warningMap: DomainWarningMapping;
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const StorageContext = createContext<StorageContext>({
  warningMap: {},
  settings: {
    whitelist: "",
  },
  setSettings: () => {},
});

const StorageProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [warningMap, setWarningMap] = useState<DomainWarningMapping>({});
  const [settings, setSettingsState] = useState<Settings>({ whitelist: "" });

  useEffect(() => {
    browser.storage.sync.get(["warnings", "whitelist"]).then((result) => {
      setWarningMap(result.warnings);
      setSettings({ whitelist: result.whitelist });
    });
  }, []);

  const setSettings = (settings: Settings) => {
    browser.storage.sync.set(settings);
    setSettingsState(settings);
  };

  return <StorageContext.Provider value={{ warningMap, settings, setSettings }}>{children}</StorageContext.Provider>;
};

export default StorageProvider;

export const useStorage = (): StorageContext => useContext(StorageContext);
