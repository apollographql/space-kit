export interface MonochromePalette {
  darker: string;
  dark: string;
  base: string;
  light: string;
  lighter: string;
}

export interface ColorPalette extends MonochromePalette {
  darkest: string;
  lightest: string;
}

export const colors = {
  pink: {
    darkest: "#661f4e",
    darker: "#832363",
    dark: "#c43997",
    base: "#f25cc1",
    light: "#ffa3e0",
    lighter: "#ffd4f1",
    lightest: "#ffe6f7",
  },

  teal: {
    darkest: "#1f6664",
    darker: "#1d7b78",
    dark: "#26a29d",
    base: "#41d9d3",
    light: "#8bf6f2",
    lighter: "#c6fffd",
    lightest: "#e6fffe",
  },

  indigo: {
    darkest: "#2d1f66",
    darker: "#311c87",
    dark: "#3f20ba",
    base: "#7156d9",
    light: "#ad9bf6",
    lighter: "#d9cfff",
    lightest: "#ebe6ff",
  },

  black: {
    darker: "#12151A",
    dark: "#14171C",
    base: "#191C23",
    light: "#22262E",
    lighter: "#2F353F",
  },

  grey: {
    darker: "#424855",
    dark: "#5A6270",
    base: "#777F8E",
    light: "#959DAA",
    lighter: "#B2B9C3",
  },

  silver: {
    darker: "#CAD0D8",
    dark: "#DEE2E7",
    base: "#EBEEF0",
    light: "#F4F6F8",
    lighter: "#FCFDFF",
  },

  red: {
    darkest: "#661f1f",
    darker: "#781c1c",
    dark: "#9c2323",
    base: "#d13b3b",
    light: "#f18686",
    lighter: "#ffc3c3",
    lightest: "#ffe6e6",
  },

  green: {
    darkest: "#145e33",
    darker: "#136c38",
    dark: "#1c8448",
    base: "#36ad68",
    light: "#7ed9a4",
    lighter: "#bef4d5",
    lightest: "#e6fff0",
  },

  blue: {
    darkest: "#163c66",
    darker: "#0f417a",
    dark: "#1053a0",
    base: "#2075d6",
    light: "#74b0f4",
    lighter: "#bbdbff",
    lightest: "#f0f7ff",
  },

  orange: {
    darkest: "#663f1f",
    darker: "#884c1e",
    dark: "#b46626",
    base: "#f59140",
    light: "#ffc18f",
    lighter: "#ffe2ca",
    lightest: "#fff1e6",
  },

  yellow: {
    darkest: "#66501f",
    darker: "#84671d",
    dark: "#b48f25",
    base: "#f4d03f",
    light: "#ffe88e",
    lighter: "#fff4ca",
    lightest: "#fffae6",
  },

  purple: {
    darkest: "#421666",
    darker: "#521584",
    dark: "#711eb4",
    base: "#a23df5",
    light: "#cd8fff",
    lighter: "#e8ccff",
    lightest: "#f4e6ff",
  },

  blilet: {
    darkest: "#1B2240",
    darker: "#252E50",
    dark: "#3C4A85",
    base: "#5168C2",
    light: "#7A92F0",
    lighter: "#B0BEF7",
    lightest: "#E6EBFF",
  },

  white: "#ffffff",
} as const;

/**
 * An enumeration of all colors in all shaded palettes. These are all the colors
 * that can be lightened and darkened. This excludes colors.white intentionally
 * because that will not be a valid input for a color change function.
 *
 * This can be used to restrict a prop to only be a color value from one of our
 * palettes.
 */
export type ShadedColor =
  | typeof colors["pink"][keyof typeof colors["pink"]]
  | typeof colors["teal"][keyof typeof colors["teal"]]
  | typeof colors["indigo"][keyof typeof colors["indigo"]]
  | typeof colors["black"][keyof typeof colors["black"]]
  | typeof colors["grey"][keyof typeof colors["grey"]]
  | typeof colors["silver"][keyof typeof colors["silver"]]
  | typeof colors["red"][keyof typeof colors["red"]]
  | typeof colors["green"][keyof typeof colors["green"]]
  | typeof colors["blue"][keyof typeof colors["blue"]]
  | typeof colors["orange"][keyof typeof colors["orange"]]
  | typeof colors["yellow"][keyof typeof colors["yellow"]]
  | typeof colors["purple"][keyof typeof colors["purple"]]
  | typeof colors["blilet"][keyof typeof colors["blilet"]];
