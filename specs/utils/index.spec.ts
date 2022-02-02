import { minifyString } from "../../src/utils";

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
    const minifiedString = minifyString("This is a\n multi-line string");

    expect(minifiedString).toBe("Thisisamulti-linestring");
  });
});
