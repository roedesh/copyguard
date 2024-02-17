export type ContentScriptMessage = {
  domain: string;
  clipboardData?: string | null;
  selection: string;
  hasHiddenElementsInSelection: boolean;
};