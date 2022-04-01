export type Warning = {
  type: string;
  selection: string;
  clipboard: string;
};

export type LogState = {
  [key: string]: Warning[];
};
