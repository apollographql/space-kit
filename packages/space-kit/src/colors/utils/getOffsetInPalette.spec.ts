import { getOffsetInPalette } from "./getOffsetInPalette";
import { colors } from "../index";

test("when passed search for lighter shade, returns correct color", () => {
  expect(getOffsetInPalette(1, "lighter", colors.red.dark)).toBe(
    colors.red.base,
  );

  expect(getOffsetInPalette(1, "lighter", colors.red.base)).toBe(
    colors.red.light,
  );

  expect(getOffsetInPalette(1, "lighter", colors.red.light)).toBe(
    colors.red.lighter,
  );
});

test("when passed search for darker shade, returns correct color", () => {
  expect(getOffsetInPalette(1, "darker", colors.red.dark)).toBe(
    colors.red.darker,
  );

  expect(getOffsetInPalette(1, "darker", colors.red.base)).toBe(
    colors.red.dark,
  );

  expect(getOffsetInPalette(1, "darker", colors.red.light)).toBe(
    colors.red.base,
  );
});

test("should return darkest non-monochrome color when offset goes past boundary", () => {
  expect(getOffsetInPalette(Infinity, "darker", colors.red.base)).toBe(
    colors.red.darkest,
  );
});

test("should return lightest non-monochrome color when offset goes past boundary", () => {
  expect(getOffsetInPalette(Infinity, "lighter", colors.red.base)).toBe(
    colors.red.lightest,
  );
});

test("should return darkest monochrome color when offset goes past boundary", () => {
  expect(getOffsetInPalette(Infinity, "darker", colors.silver.base)).toBe(
    colors.silver.darker,
  );
});

test("should return lightest monochrome color when offset goes past boundary", () => {
  expect(getOffsetInPalette(Infinity, "lighter", colors.silver.base)).toBe(
    colors.silver.lighter,
  );
});

test("should throw when passed a color not in a palette", () => {
  expect(() => getOffsetInPalette(1, "darker", "fake color" as any)).toThrow();
});

test("should throw when passed a color not in a palette", () => {
  expect(() => getOffsetInPalette(1, "darker", "fake color" as any)).toThrow();
});
