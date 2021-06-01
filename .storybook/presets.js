/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = [
  path.resolve(path.join(__dirname, "privatePresets/ignoreTestFilesPreset.js")),
  {
    name: "@storybook/preset-typescript",
    options: {
      tsLoaderOptions: {
        transpileOnly: true,
      },
      tsDocgenLoaderOptions: {
        // Specify this manually or the loader won't find the config. See
        // https://github.com/strothj/react-docgen-typescript-loader/issues/10
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
      },
    },
  },
  "@storybook/addon-docs/react/preset",
];