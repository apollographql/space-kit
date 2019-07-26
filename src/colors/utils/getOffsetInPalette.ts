import { MonochromePalette, ColorPalette, PaletteColor } from "../index";
import { findPaletteByColor } from "./findPaletteByColor";

const monochromePaletteKeys: ReadonlyArray<keyof MonochromePalette> = [
  "darker",
  "dark",
  "base",
  "light",
  "lighter",
] as const;

const colorPaletteKeys: ReadonlyArray<keyof ColorPalette> = [
  "darkest",
  ...monochromePaletteKeys,
  "lightest",
] as const;

function isColorPalette(
  palette: MonochromePalette | ColorPalette
): palette is ColorPalette {
  return palette.hasOwnProperty("darkest");
}

/**
 * Given a color and a palette the color belongs to, find another color in that
 * palette given an offset. The offset should be a number representing how many
 * shades darker or lighter we want with the direction specificed by
 * `offsetDirection`. If we try to go beyond the bounds, we'll return the
 * closest item we can. In other words, if we pass `Infinity` and `darker`, then
 * we'll return the darkest color in the palette. If we pass `Infinity` and `lighter` we'll
 * return the lightest color in the palette.
 *
 * This function will throw if `color` is not one of the values in `palette`.
 *
 * @param offset A number representing how many shades away from the original
 * `color` to return. If the offset goes beyond the bounds of the palette, the most extreme color
 * in that direction will be chosen.
 * @param offsetDirection Which direction we wish to be offset, `"lighter"` or `"darker"`.
 * @param color A color in one of our palettes
 */
export function getOffsetInPalette(
  offset: number,
  offsetDirection: "lighter" | "darker",
  color: PaletteColor
): string {
  /**
   * Palette this color belongs to
   */
  const palette = findPaletteByColor(color);

  /**
   * A numerical value of the offset with the `offsetDirection` taken into
   * account. This will be positive for lighter values and negative for darker
   * values.
   */
  const effectiveOffset = offsetDirection === "lighter" ? offset : -offset;

  if (isColorPalette(palette)) {
    const index = Object.keys(palette).findIndex(
      paletteKey => palette[paletteKey as keyof ColorPalette] === color
    );

    if (!index) {
      throw new TypeError("The color provided was not found in this palette");
    }

    // Use `max` to prevent a negative number. We explicitly do not throw an
    // error here.
    return palette[
      colorPaletteKeys[
        Math.min(
          Object.keys(palette).length - 1,
          Math.max(0, index + effectiveOffset)
        )
      ]
    ];
  }

  const index = Object.keys(palette).findIndex(
    paletteKey => palette[paletteKey as keyof MonochromePalette] === color
  );

  if (!index) {
    throw new TypeError("The color provided was not found in this palette");
  }

  // Use `max` to prevent a negative number. We explicitly do not throw an
  // error here.
  return palette[
    monochromePaletteKeys[
      Math.min(
        Object.keys(palette).length - 1,
        Math.max(0, index + effectiveOffset)
      )
    ]
  ];
}
