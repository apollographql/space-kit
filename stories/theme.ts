import { create } from "@storybook/theming";
import * as colors from "../src/colors";
import * as fonts from "../src/fonts";

export default create({
  base: "light",

  colorPrimary: colors.teal.base,
  colorSecondary: colors.blue.base,

  // UI
  appBg: colors.silver.light,
  appContentBg: colors.white,
  appBorderColor: colors.silver.dark,
  appBorderRadius: 4,

  // Typography
  fontBase: fonts.base,
  fontCode: fonts.mono,

  // Text colors
  textColor: colors.black.base,
  textInverseColor: colors.black.base,

  // Toolbar default and active colors
  barTextColor: colors.grey.base,
  barSelectedColor: colors.teal.base,
  barBg: colors.white,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.grey.darker,
  inputTextColor: colors.black.base,
  inputBorderRadius: 4,

  brandTitle: "Space Kit",
  brandUrl: "https://github.com/apollographql/space-kit",
  brandImage:
    "https://user-images.githubusercontent.com/5922187/57668515-747a8a00-75bc-11e9-9cff-207f71865c82.png"
});
