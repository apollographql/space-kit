import * as CSS from "csstype";

type TLength = string | 0 | number;

export interface TypographyDefinition {
  fontFamily: CSS.FontFamilyProperty;
  fontSize: CSS.FontSizeProperty<TLength>;
  fontWeight: CSS.FontWeightProperty;
  lineHeight: CSS.LineHeightProperty<TLength>;
  textTransform: CSS.TextTransformProperty;
}
