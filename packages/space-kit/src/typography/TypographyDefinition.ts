import type { Property } from "csstype";

type TLength = string | 0 | number;

/**
 * Things that we define in our typography style system.
 */
export interface TypographyDefinition {
  fontFamily: Property.FontFamily;
  fontSize: Property.FontSize<TLength>;
  /**
   * This is optional. We shouldn't be setting the style when we don't care what
   * is.
   */
  fontWeight?: Property.FontWeight;
  lineHeight: Property.LineHeight<TLength>;
}
