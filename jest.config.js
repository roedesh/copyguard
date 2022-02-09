module.exports = {
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "js", "tsx"],
  setupFilesAfterEnv: ["./specs/setup.ts"],
  globals: { "ts-jest": { tsconfig: "<rootDir>/tsconfig.spec.json" } },
};
