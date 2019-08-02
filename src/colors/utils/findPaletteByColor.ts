import {
  colors,
  ColorPalette,
  MonochromePalette,
  PaletteColor,
} from "../index";

export function findPaletteByColor(
  searchColor: PaletteColor
): MonochromePalette | ColorPalette {
  const result = Object.values(colors)
    .filter(color => typeof color !== "string")
    .find(
      // We need to declare the result of the `filter` function's callback to
      // tell TypeScript we are narrowing the type. By default,
      // `Array.prototype.filter` has the same return type as it's given as an
      // input; we're explicitly doing something different here.
      // @see https://github.com/Microsoft/TypeScript/issues/7657#issuecomment-228697078
      color => {
        return Object.values(color).includes(searchColor);
      }
    );

  if (!result) {
    throw new Error("Could not find color in palette");
  }

  // We know that the interface conforms to one of these, but we can't infer
  // this because we defined all the palettes `as const` so we can restrict
  // input to only values in those palettes.
  return result as (MonochromePalette | ColorPalette);
}
