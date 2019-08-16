/** @jsx jsx */
import { colors, PaletteColor } from "../colors";
import * as CSS from "csstype";
import { base } from "../typography";
import { jsx, css } from "@emotion/core";
import { getOffsetInPalette } from "../colors/utils/getOffsetInPalette";
import tinycolor from "tinycolor2";
import React, { PropsWithChildren } from "react";

type TLength = string | 0 | number;

function assertUnreachable(value: never): never {
  throw new TypeError(`Unreachable value reached ${value}`);
}

/**
 * Save a default color so we can check if we used the default or not. The
 * default color has a few special properties.
 */
const defaultColor = colors.silver.light;

/**
 * Get the button's text color
 */
function getTextColor({
  color,
  feel,
  theme,
  mode,
}: {
  color: NonNullable<ButtonProps["color"]>;
  feel: NonNullable<ButtonProps["feel"]>;
  theme: NonNullable<ButtonProps["theme"]>;
  mode?: CSS.SimplePseudos;
}): CSS.ColorProperty | undefined {
  // Text color will always be the same for secondary buttons
  if (color === colors.white) {
    return colors.grey.darker;
  }

  switch (feel) {
    case "raised":
      // Set the base (meaning no pseudo-selectors) text color for raised
      // buttons. Otherwise return `undefined` to not change the color.
      //
      // We have some special logic for the raised color; set the text color to
      // be what is most readable between white and the default text color and
      // the _hover_ color's background. This is overrideable by the user, but
      // it shouldn't need to be.
      return !mode
        ? tinycolor
            .mostReadable(
              getHoverBackgroundColor({ color, feel, theme }),
              [colors.white, colors.grey.darker],
              {
                level: "AA",
                size: "small",
              }
            )
            .toString()
        : undefined;
    case "flat":
      if (color === defaultColor) {
        return theme === "dark" ? colors.grey.light : colors.grey.darker;
      }

      // We have a custom color and we're in dark mode, lighten the base and
      // focused colors 1 shade.
      if (theme === "dark" && (!mode || mode === ":focus")) {
        return getOffsetInPalette(1, "lighter", color);
      }

      return color;
    default:
      throw assertUnreachable(feel);
  }
}

/**
 * Get the button's height
 */
function getHeight({
  size,
}: {
  size: NonNullable<ButtonProps["size"]>;
}): CSS.HeightProperty<TLength> {
  switch (size) {
    case "small":
      return 28;
    case "default":
      return 36;
    case "large":
      return 42;
    default:
      throw assertUnreachable(size);
  }
}

/**
 * Get the hover background color
 */
function getHoverBackgroundColor({
  color,
  feel,
  theme,
}: {
  color: NonNullable<ButtonProps["color"]>;
  feel: NonNullable<ButtonProps["feel"]>;
  theme: NonNullable<ButtonProps["theme"]>;
}): CSS.BackgroundColorProperty {
  if (color === colors.white) {
    // Special case for secondary buttons
    return colors.silver.light;
  }

  switch (feel) {
    case "flat":
      // Hardcode if we're using the default color (special case), otherwise get
      // the next lightest color.
      if (color === defaultColor) {
        return theme === "light" ? colors.silver.light : colors.grey.dark;
      }

      return getOffsetInPalette(Infinity, "lighter", color);
    case "raised":
      // One shade darker
      return getOffsetInPalette(1, "darker", color);
    default:
      throw assertUnreachable(feel);
  }
}

// Types that could use some improvement:
// * Don't allow `children` and `icon` to be missing
// * Don't allow `children` when `FAB`
//
// I was able to get guarantees to work, but only with very cryptic errors. I
// decided it'd be best, for the time being, to `throw` if we use things
// incorrectly.
interface ButtonProps {
  /**
   * Lets you customize how you're going to render this component. You can
   * either one of two things:
   *
   * 1. A string representing the type of element you want rendered, or
   * 2. A render function. The render function will be called with the props
   *    that need to be passed to the element. You can use this to change the
   *    element being rendered or to add your own props that aren't included in
   *    this component.
   *
   * @default "button"
   */
  // as?: string |  React.ComponentType<Props>;

  /**
   * Base color to calculate all other colors with
   *
   * This has a special meaning for buttons with a "flat" feel; this will change
   * the text color as well as the background colors.
   *
   * Pass `colors.white` to treat this button as a secondary button
   */
  color?: PaletteColor | typeof colors["white"];

  /**
   * Disable the button
   */
  disabled?: boolean;

  /**
   * Which feel to display
   *
   * The options are as follows:
   *
   * - `"raised"` (default): A button with a border and a background
   * - `"flat"`: No background or border
   */
  feel?: "raised" | "flat";

  /**
   * Either an icon to show to the left of the button text, or on it's own
   */
  icon?: React.ReactElement;

  /**
   * Callback for when the button is clicked. Passes through native react event
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * Size of the button
   *
   * Defaults to "default"
   */
  size?: "default" | "small" | "large";

  /**
   * Theme to display the button
   *
   * Different themes have different box-shadows. Right now we have these
   * options, but this may expand in the future:
   *
   * - `"light"` (default)
   * - `"dark"`
   */
  theme?: "light" | "dark";

  /**
   * Type of the button
   */
  type?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];

  /**
   * Button variants
   *
   * The options are as follows:
   *
   * - `undefined` (default): A button with text and an optional icon
   * - `"fab"`: Floating action button
   *
   *   You must include an `icon` prop and you must _not_ include a `children`
   *   prop for a floating action button.
   *
   *   _Note: this is not type checked; it will cause a runtime error_
   */
  variant?: "fab";
}

/**
 * Style system for Space Kit buttons
 *
 * This is intended to be used as an abstraction for your project's style guide.
 *
 * @see https://zpl.io/amdN6Pr
 */
export const Button: <WhateverComponentProps>(
  props: PropsWithChildren<
    { as: React.ComponentType<WhateverComponentProps> } & ButtonProps &
      WhateverComponentProps
  >
) => React.ReactElement = props => {
  const {
    as = "button",
    children,
    color = defaultColor,
    disabled = false,
    variant,
    feel = "raised",
    icon,
    onClick,
    size = "default",
    theme = "light",
  } = props;
  /**
   * Icon size in pixels
   *
   * This is stored so we can use the same value for `height` and `width`
   */
  const iconSize = size === "small" ? 12 : size === "large" ? 24 : 16;

  const iconOnly = !children;

  if (variant === "fab") {
    if (!icon) {
      throw new TypeError("FAB buttons are required to have an `icon`");
    } else if (children) {
      throw new TypeError("FAB buttons cannot have children, only an `icon`");
    }
  }

  const propsToPass = {
    ...props,
    css: css([
      {
        "&[disabled]": {
          backgroundColor:
            feel === "flat"
              ? "transparent"
              : theme === "light"
              ? colors.silver.dark
              : colors.grey.dark,
          color:
            feel === "flat" && theme === "dark"
              ? colors.grey.dark
              : colors.grey.light,

          // We need to also set the `:hover` on `:disabled` so it has a higher
          // specificity than any `:hover` classes passed in. This also means
          // that both of these need to be overriden if we want to use a custom
          // disabled color.
          ":hover": {
            backgroundColor:
              feel === "flat"
                ? "transparent"
                : theme === "light"
                ? colors.silver.dark
                : colors.grey.dark,
            color:
              feel === "flat" && theme === "dark"
                ? colors.grey.dark
                : colors.grey.light,
          },
        },

        backgroundColor:
          color === colors.white
            ? colors.white
            : feel === "raised"
            ? color
            : "transparent",

        borderRadius: variant === "fab" ? "100%" : 4,

        borderWidth: 0,
        ...(feel !== "flat" && {
          boxShadow:
            theme === "light"
              ? "0 1px 4px 0 rgba(18, 21, 26, 0.08), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
              : "0 0 0 1px rgba(18, 21, 26, 0.2), 0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 1px 0 0 rgba(18, 21, 26, 0.05)",
        }),

        color: getTextColor({ color, feel, theme }),

        // Vertically center children
        display: "inline-flex",
        justifyContent: "center",

        height: getHeight({ size }),

        minWidth: iconOnly
          ? size === "small"
            ? 28
            : size === "large"
            ? 42
            : 36
          : size === "small"
          ? 76
          : size === "large"
          ? 112
          : 100,

        // We have to set the Y padding because browsers (at least Chrome) has
        // a non-symmetrical vertical padding applied by default.
        padding: `0 ${size === "small" ? 8 : size === "large" ? 8 : 7}px`,

        ...(size === "small"
          ? base.small
          : size === "large"
          ? base.large
          : base.base),

        fontWeight: 600,

        // Disable the outline because we're setting a custom `:active` style
        outline: 0,

        textDecoration: "none",
      },

      !disabled && {
        ":hover, &[data-force-hover-state]": {
          backgroundColor: getHoverBackgroundColor({ color, feel, theme }),
          color: getTextColor({ color, feel, theme, mode: ":hover" }),
          cursor: "pointer",
          ...(feel !== "flat" && {
            // The `box-shadow` property is copied directly from Zeplin
            boxShadow:
              theme === "light"
                ? "0 5px 10px 0 rgba(18, 21, 26, 0.12), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
                : "0 0 0 1px rgba(18, 21, 26, 0.2), 0 5px 10px 0 rgba(18, 21, 26, 0.12), 0 1px 0 0 rgba(18, 21, 26, 0.05)",
          }),
        },
        ":focus, &[data-force-focus-state]": {
          ...(feel === "flat" && {
            backgroundColor: theme === "light" ? colors.white : "#000",
            color: theme === "light" ? colors.blue.base : colors.blue.light,
          }),
          // The `box-shadow` property is copied directly from Zeplin for the
          // light theme. For the dark theme we use a variant of the color to
          // make the borders sharp.
          boxShadow: `0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 0 0 2px ${
            theme === "light" ||
            color === defaultColor ||
            color === colors.white
              ? "#bbdbff"
              : getOffsetInPalette(Infinity, "lighter", color)
          }, inset 0 0 0 1px ${
            color === defaultColor || color === colors.white
              ? "#2075d6"
              : getOffsetInPalette(1, "darker", color)
          }, inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)`,
        },
        "&:active, &[data-force-active-state]": {
          ...(getTextColor({ color, feel, theme, mode: ":hover" }) && {
            color: getTextColor({ color, feel, theme, mode: ":active" }),
          }),

          backgroundColor:
            color === colors.white
              ? colors.white
              : feel === "raised"
              ? color
              : color === defaultColor
              ? theme === "dark"
                ? colors.grey.darker
                : colors.silver.base
              : getOffsetInPalette(2, "lighter", color),

          // The `box-shadow` properties are copied directly from Zeplin
          boxShadow:
            feel !== "flat"
              ? theme === "light"
                ? "inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05), inset 0 2px 2px 0 rgba(18, 21, 26, 0.12)"
                : "0 0 0 1px rgba(18, 21, 26, 0.2), 0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 -1px 0 0 rgba(18, 21, 26, 0.16), inset 0 1px 2px 0 rgba(18, 21, 26, 0.42)"
              : "none",
          outline: "0",
        },
      },
    ]),
    disabled,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(event);
      }

      // We want to hide the blue border around a button after we've clicked
      // on it.
      event.currentTarget.blur();
    },

    children: (
      <div
        css={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon && (
          <span
            css={{
              alignItems: "center",
              // This needs to be `inline-flex` and not the default of
              // `inline-block` to vertically center the icon automatically
              display: "inline-flex",
              height: iconSize,
              justifyContent: "center",
              // The `4px` will be on the right to separate the icon from the text
              margin: iconOnly ? 0 : "0 4px 0",
              width: iconSize,
            }}
          >
            {icon}
          </span>
        )}
        {children}
      </div>
    ),
  };

  return typeof as === "string" ? (
    jsx(as, { ...propsToPass })
  ) : (
    <props.as {...propsToPass} />
  );
};
