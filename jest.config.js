module.exports = {
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["./specs/setup.ts"],
  globals: { "ts-jest": { tsconfig: "<rootDir>/tsconfig.spec.json" } },
};
