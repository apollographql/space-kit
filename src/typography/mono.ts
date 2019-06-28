import * as fonts from "../fonts";
import * as CSS from "csstype";
import { TypographyDefinition } from "./TypographyDefinition";

const defaultTypographyDefinitions: {
  fontFamily: CSS.FontFamilyProperty;
  fontWeight: CSS.FontWeightProperty;
  textTransform: CSS.TextTransformProperty;
} = {
  fontFamily: fonts.mono,
  fontWeight: "normal",
  textTransform: "initial"
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
