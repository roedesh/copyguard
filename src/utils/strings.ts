export const minifyString = (str: string) => str.replace(/\s/g, "");

export const removePrefixWWW = (hostname: string) => {
  if (hostname.startsWith("www.")) return hostname.replace("www.", "");
  return hostname;
};
