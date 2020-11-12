/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.@(story|stories).@(js|jsx|tsx|mdx)",
    "../stories/**/*.@(story|stories).@(js|jsx|tsx|mdx)",
  ],
  addons: [
    path.resolve(
      path.join(__dirname, "privatePresets/ignoreTestFilesPreset.js")
    ),
    "@storybook/addon-docs",
  ],
  babel(babelConfig) {
    return {
      ...babelConfig,
      presets: babelConfig.presets.map((preset) => {
        const presetName = Array.isArray(preset) ? preset[0] : preset;
        const presetOptions = Array.isArray(preset) ? preset[1] : [];

        if (presetName !== require.resolve("@babel/preset-react")) {
          return preset;
        }

        return [
          presetName,
          {
            ...presetOptions,
            runtime: "classic",
          },
        ];
      }),
    };
  },
};
