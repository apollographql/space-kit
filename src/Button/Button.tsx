import { colors, PaletteColor } from "../colors";
import * as CSS from "csstype";
import { base } from "../typography";
import { ClassNames } from "@emotion/core";
import { getOffsetInPalette } from "../colors/utils/getOffsetInPalette";
import tinycolor from "tinycolor2";
import React, { PropsWithChildren } from "react";
import classnames from "classnames";

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
  color: NonNullable<Props["color"]>;
  feel: NonNullable<Props["feel"]>;
  theme: NonNullable<Props["theme"]>;
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
  size: NonNullable<Props["size"]>;
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
  color: NonNullable<Props["color"]>;
  feel: NonNullable<Props["feel"]>;
  theme: NonNullable<Props["theme"]>;
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
interface Props {
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

// Why isn't this in it's own file? I don't know how to make the default value
// ("button" in this case) into something that can be reused. If someone else
// figures that out, it would be great to share this across components.
type ComponentWithAs<OriginalComponentProps> = <
  // This doesn't include `React.ComponentType` because I couldn't figure out
  // how to correctly type it's `P` (props) generic. The default is `{}`, which
  // will cause TypeScript to prevent any props besides `PropWithChildren{}`. If
  // we use `<any>`, then (for whatever reason), TypeScript stops checking the
  // props when `as extends keyof JSX.IntrinsicElements`.
  As extends React.ReactElement | keyof JSX.IntrinsicElements = "button"
>(
  props: PropsWithChildren<
    ({ as?: As }) &
      OriginalComponentProps &
      (As extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[As]
        : As extends React.ReactElement
        ? {}
        : never)
  >
) => ReturnType<React.FC>;

/**
 * Style system for Space Kit buttons
 *
 * This is intended to be used as an abstraction for your project's style guide.
 *
 * @see https://zpl.io/amdN6Pr
 */
export const Button: ComponentWithAs<Props> = ({
  as = "button",
  children,
  color = defaultColor,
  variant,
  feel = "raised",
  icon,
  size = "default",
  theme = "light",
  ...otherProps
}) => (
  <ClassNames>
    {({ cx, css }) => {
      const onClick:
        | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
        | undefined = React.isValidElement(as)
        ? as.props.onClick
        : "onClick" in otherProps
        ? (otherProps as any).onClick
        : undefined;

      const disabled: boolean | undefined = React.isValidElement(as)
        ? as.props.disabled
        : "disabled" in otherProps
        ? (otherProps as any).disabled
        : undefined;

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
          throw new TypeError(
            "FAB buttons cannot have children, only an `icon`"
          );
        }
      }

      const propsToPass = {
        ...otherProps,
        className: classnames(
          // I couldn't figure out how to get TypeScript to recognize that
          // `className` can be in `otherProps`.
          "className" in otherProps && (otherProps as any).className,
          cx(
            css([
              {
                // We need to also set the `:hover` on `:disabled` so it has a
                // higher specificity than any `:hover` classes passed in. This
                // also means that both of these need to be overriden if we want
                // to use a custom disabled color.
                "&[disabled], &[disabled]:hover": {
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
                padding: `0 ${
                  size === "small" ? 8 : size === "large" ? 8 : 7
                }px`,

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
                  backgroundColor: getHoverBackgroundColor({
                    color,
                    feel,
                    theme,
                  }),
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
                    color:
                      theme === "light" ? colors.blue.base : colors.blue.light,
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
                    color: getTextColor({
                      color,
                      feel,
                      theme,
                      mode: ":active",
                    }),
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
            ])
          )
        ),
        disabled,
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          if (onClick) {
            onClick(event);
          }

          // We want to hide the blue border around a button after we've clicked
          // on it.
          event.currentTarget.blur();
        },

        children: (
          <div
            className={cx(
              css({
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              })
            )}
          >
            {icon && (
              <span
                className={cx(
                  css({
                    alignItems: "center",
                    // This needs to be `inline-flex` and not the default of
                    // `inline-block` to vertically center the icon automatically
                    display: "inline-flex",
                    height: iconSize,
                    justifyContent: "center",
                    // The `4px` will be on the right to separate the icon from the text
                    margin: iconOnly ? 0 : "0 4px 0",
                    width: iconSize,
                  })
                )}
              >
                {icon}
              </span>
            )}
            {children}
          </div>
        ),
      };

      return React.isValidElement(as)
        ? React.cloneElement(as, {
            ...propsToPass,
            className: classnames(
              propsToPass.className,
              as.props.className,
              // If the parent component is using emotion with the jsx pragma,
              // we have to get fancy and intercept the styles to use with the
              // `ClassNames` wrapper.
              as.props.css ? css(as.props.css.styles) : null
            ),
          })
        : // We have to live dangerously because otherwise we'd have to
          // guarantee that all `as` values can accept all the props in
          // `propsToPass`. The inputs for this component will be statically
          // typed, so we have _some_ safety here. Also, this will show react
          // warnings instead of crashing the application.
          React.createElement(as as any, propsToPass);
    }}
  </ClassNames>
);
