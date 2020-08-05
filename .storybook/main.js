/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.@(story|stories).@(jsx|tsx|mdx)",
    "../stories/**/*.@(story|stories).@(jsx|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-docs",
    path.resolve(
      path.join(__dirname, "privatePresets/ignoreTestFilesPreset.js")
    ),
  ],
};
