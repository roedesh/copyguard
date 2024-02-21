import { removePrefixWWW } from "../../src/internal/strings";

describe("removePrefixWWW", () => {
  it("removes 'www.' from the string", () => {
    const domainWithoutWWW = removePrefixWWW("www.example.com");
    expect(domainWithoutWWW).toBe("example.com");
  });
});
