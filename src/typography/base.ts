import * as fonts from "../fonts";
import * as CSS from "csstype";
import { TypographyDefinition } from "./TypographyDefinition";

const defaultTypographyDefinitions: {
  fontFamily: CSS.FontFamilyProperty;
  fontWeight: CSS.FontWeightProperty;
  textTransform: CSS.TextTransformProperty;
} = {
  fontFamily: fonts.base,
  fontWeight: "normal",
  textTransform: "initial"
};

export const xxxlarge: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 31,
  fontWeight: 600,
  lineHeight: 1.35
};

export const xxlarge: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 26,
  fontWeight: 600,
  lineHeight: 1.23
};

export const xlarge: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: 1.5
};

export const large: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 18,
  lineHeight: 1.5
};

export const base: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 15,
  lineHeight: 1.53
};

export const small: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 13,
  lineHeight: 1.54
};

export const xsmall: TypographyDefinition = {
  ...defaultTypographyDefinitions,
  fontSize: 11,
  lineHeight: 1.55,
  textTransform: "uppercase"
};
