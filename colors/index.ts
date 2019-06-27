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

const pink: ColorPalette = {
  darkest: "#661f4e",
  darker: "#832363",
  dark: "#c43997",
  base: "#f25cc1",
  light: "#ffa3e0",
  lighter: "#ffd4f1",
  lightest: "#ffe6f7"
};

const teal: ColorPalette = {
  darkest: "#1f6664",
  darker: "#1d7b78",
  dark: "#26a29d",
  base: "#41d9d3",
  light: "#8bf6f2",
  lighter: "#c6fffd",
  lightest: "#e6fffe"
};

const indigo: ColorPalette = {
  darkest: "#2d1f66",
  darker: "#311c87",
  dark: "#3f20ba",
  base: "#7156d9",
  light: "#ad9bf6",
  lighter: "#d9cfff",
  lightest: "#ebe6ff"
};

const black: MonochromePalette = {
  darker: "#12151A",
  dark: "#14171C",
  base: "#191C23",
  light: "#22262E",
  lighter: "#2F353F"
};

const grey: MonochromePalette = {
  darker: "#424855",
  dark: "#5A6270",
  base: "#777F8E",
  light: "#959DAA",
  lighter: "#B2B9C3"
};

const silver: MonochromePalette = {
  darker: "#CAD0D8",
  dark: "#DEE2E7",
  base: "#EBEEF0",
  light: "#F4F6F8",
  lighter: "#FCFDFF"
};

const red: ColorPalette = {
  darkest: "#661f1f",
  darker: "#781c1c",
  dark: "#9c2323",
  base: "#d13b3b",
  light: "#f18686",
  lighter: "#ffc3c3",
  lightest: "#ffe6e6"
};

const green: ColorPalette = {
  darkest: "#145e33",
  darker: "#136c38",
  dark: "#1c8448",
  base: "#36ad68",
  light: "#7ed9a4",
  lighter: "#bef4d5",
  lightest: "#e6fff0"
};

const blue: ColorPalette = {
  darkest: "#163c66",
  darker: "#0f417a",
  dark: "#1053a0",
  base: "#2075d6",
  light: "#74b0f4",
  lighter: "#bbdbff",
  lightest: "#f0f7ff"
};

const orange: ColorPalette = {
  darkest: "#663f1f",
  darker: "#884c1e",
  dark: "#b46626",
  base: "#f59140",
  light: "#ffc18f",
  lighter: "#ffe2ca",
  lightest: "#fff1e6"
};

const yellow: ColorPalette = {
  darkest: "#66501f",
  darker: "#84671d",
  dark: "#b48f25",
  base: "#f4d03f",
  light: "#ffe88e",
  lighter: "#fff4ca",
  lightest: "#fffae6"
};

const purple: ColorPalette = {
  darkest: "#421666",
  darker: "#521584",
  dark: "#711eb4",
  base: "#a23df5",
  light: "#cd8fff",
  lighter: "#e8ccff",
  lightest: "#f4e6ff"
};

const blilet: ColorPalette = {
  darkest: "#1B2240",
  darker: "#252E50",
  dark: "#3C4A85",
  base: "#5168C2",
  light: "#7A92F0",
  lighter: "#B0BEF7",
  lightest: "#E6EBFF"
};

export default {
  // brand colors
  pink,
  teal,
  indigo,
  // neutrals
  grey,
  black,
  silver,
  white: "#ffffff",
  // interface colors
  red,
  green,
  blue,
  // alternate colors
  orange,
  yellow,
  purple,
  blilet
};
