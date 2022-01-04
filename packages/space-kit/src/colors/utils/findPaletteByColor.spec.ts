import { findPaletteByColor } from "./findPaletteByColor";
import { colors } from "../../colors";

test("when given a color in the palette, return correct palette", () => {
  expect(findPaletteByColor(colors.red.base)).toBe(colors.red);
});

test("when given a color not in any palette, should throw", () => {
  expect(() => findPaletteByColor("fake color" as any)).toThrow();
});
