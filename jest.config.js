/* eslint-env node */
module.exports = {
  collectCoverageFrom: ["src/**/*"],
  coveragePathIgnorePatterns: [
    ".story.*",
    "src/shared/DemoSection\\.tsx",
    "src/icons/scripts",
    "src/icons/convertUtils",
    "src/icons/.*?\\.tsx",
    "\\.(stories|story)(\\.|\\/)",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>jest/setup.js"],
  snapshotSerializers: ["jest-emotion"],
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
