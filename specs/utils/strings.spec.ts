import { minifyString, removePrefixWWW } from "../../src/utils/strings";

describe("minifyString", () => {
  it("removes whitespace from a string", () => {
    const minifiedString = minifyString("This is a string with spaces");
    expect(minifiedString).toBe("Thisisastringwithspaces");
  });

  it("removes tabs from a string", () => {
    const minifiedString = minifyString("This\tis\ta\tstring\twith\ttabs");
    expect(minifiedString).toBe("Thisisastringwithtabs");
  });

  it("removes newline characters from a string", () => {
    const minifiedString = minifyString("This is a\n multi-line \nstring");

    expect(minifiedString).toBe("Thisisamulti-linestring");
  });
});

describe("removePrefixWWW", () => {
  it("removes 'www.' from the string", () => {
    const domainWithoutWWW = removePrefixWWW("www.example.com");
    expect(domainWithoutWWW).toBe("example.com");
  });
});
