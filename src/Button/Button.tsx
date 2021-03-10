/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { colors, ShadedColor } from "../colors";
import type { Property, SimplePseudos } from "csstype";
import { base } from "../typography";
import { ClassNames, jsx, CSSObject } from "@emotion/react";
import { getOffsetInPalette } from "../colors/utils/getOffsetInPalette";
import tinycolor from "tinycolor2";
import React, { useState } from "react";
import { LoadingSpinner } from "../Loaders";
import { assertUnreachable } from "../shared/assertUnreachable";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import omit from "lodash/omit";
import { ButtonIcon } from "./button/ButtonIcon";
import { inputHeightDictionary } from "../shared/inputHeightDictionary";
import { useTooltipContext } from "../shared/TooltipContext";
type TLength = string | 0 | number;

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
  mode?: SimplePseudos;
}): Property.Color | undefined {
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
              },
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
    /* istanbul ignore next */
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
}): Property.Height<TLength> {
  switch (size) {
    case "small":
      return 28;
    case "default":
    case "standard":
      return 36;
    case "large":
      return 42;
    /* istanbul ignore next */
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
}): Property.BackgroundColor {
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
    /* istanbul ignore next */
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
interface Props
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "css"
  > {
  /**
   * Override the the default element used to render a button
   *
   * All props provided will be merged with props that `Button` adds, including
   * `className`s being merged.
   *
   * @default <button />
   */
  as?: React.ReactElement;

  /**
   * Base color to calculate all other colors with
   *
   * This has a special meaning for buttons with a "flat" feel; this will change
   * the text color as well as the background colors.
   *
   * Pass `colors.white` to treat this button as a secondary button
   *
   * @default colors.silver.light
   */
  color?: ShadedColor | typeof colors["white"];

  /**
   * If the button will appear and behave disabled.
   *
   * This will be directly applied to the underlying `button` with a notable
   * exception: if this `Button` is rendered inside of a `Tooltip`, is disabled,
   * and the pointer is over the button, the `disabled` prop will be removed
   * from the `button` element and the disabled styles will be directly applied.
   * This will allow disabled buttons to still use `Tooltip`.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon to use at the end of a button
   *
   * The size of icons will be automatically determined, but can be overriden
   */
  endIcon?: React.ReactElement;

  /**
   * Which feel to display
   *
   * The options are as follows:
   *
   * - `"raised"` (default): A button with a border and a background
   * - `"flat"`: No background or border
   *
   * @default "raised"
   */
  feel?: "raised" | "flat";

  /**
   * Either an icon to show to the left of the button text, or on it's own
   */
  icon?: React.ReactElement;

  /**
   * Show a loading spinner in place of the original icon on this button
   *
   * Automatically disables the button as well
   */
  loading?: boolean;

  /**
   * Size of the button
   *
   * The `default` option has been deprecated but will probably never be removed
   * for reverse compatability.
   *
   * @default "standard"
   */
  size?: keyof typeof inputHeightDictionary | "default";

  /**
   * Theme to display the button
   *
   * Different themes have different box-shadows. Right now we have these
   * options, but this may expand in the future:
   *
   * - `"light"` (default)
   * - `"dark"`
   *
   * @default "light"
   */
  theme?: "light" | "dark";

  /**
   * The type of the button
   *
   * This isn't included in HTMLAttributes but it's a very common property
   * passed to a button, so we're including it here. If you pass `type` prop
   * when using any element besides `<button>` you will get React warnings about
   * passing unrecognized props to an element.
   */
  type?: "button" | "submit" | "reset" | undefined;

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
export const Button = React.forwardRef<HTMLElement, Props>(
  (
    {
      as = <button />,
      children,
      color = defaultColor,
      variant,
      endIcon,
      feel = "raised",
      icon: iconProp,
      loading,
      size = "standard",
      theme = "light",
      ...passthroughProps
    },
    ref,
  ) => {
    if (size === "default") {
      size = "standard";
    }
    const { isFocusVisible, focusProps } = useFocusRing();

    // Capture if the mouse is over the button by using `onPointerEnter` and
    // `onPointerLeave`, which will still fire if the button is disabled. When
    // we know the cursor is over the button, then override the button's
    // `disabled` behavior to allow `Tooltip`s to work.
    const [isPointerOver, setIsPointerOver] = useState(false);

    const mergedProps = mergeProps(passthroughProps, as.props, focusProps, {
      ref,
    });

    /**
     * If the button is in a `loading` state, then always treat the button as
     * disabled.
     */
    if (loading) {
      mergedProps.disabled = true;
    }

    /**
     * Flag indicating we're going to override the default disabled behavior to
     * make an antecedent `Tooltip` work
     */
    const overrideDisabledBehavior: boolean =
      useTooltipContext().descendsFromTooltip &&
      isPointerOver &&
      mergedProps.disabled;

    /**
     * Handler to avoid responding to click events for all attached listeners
     * when `disabled`
     */
    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      // If the button is disabled, then don't propogate `onClick`
      // events.
      if (mergedProps.disabled) return event.preventDefault();

      mergedProps.onClick?.(event);
    };

    /**
     * Styles to apply when button is disabled.
     *
     * We store this because we use this in multiple places to account for
     * overriding the default disabled behavior.
     */
    const disabledStyles = {
      backgroundColor:
        feel === "flat"
          ? "transparent"
          : theme === "light"
          ? colors.silver.light
          : colors.grey.dark,
      boxShadow: "none",
      color:
        feel === "flat" && theme === "dark"
          ? colors.grey.dark
          : colors.grey.light,
    };

    const focusedStyles: CSSObject = {
      ...(feel === "flat" && {
        backgroundColor: theme === "light" ? colors.white : "#000",
        color: theme === "light" ? colors.blue.base : colors.blue.light,
      }),
      // The `box-shadow` property is copied directly from Zeplin for the
      // light theme. For the dark theme we use a variant of the color to
      // make the borders sharp.
      boxShadow: `0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 0 0 2px ${
        theme === "light" || color === defaultColor || color === colors.white
          ? "#bbdbff"
          : getOffsetInPalette(Infinity, "lighter", color)
      }, inset 0 0 0 1px ${
        color === defaultColor || color === colors.white
          ? "#2075d6"
          : getOffsetInPalette(1, "darker", color)
      }, inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)`,
    };

    const icon = loading ? (
      <LoadingSpinner
        size="2xsmall"
        theme={theme === "light" ? "grayscale" : "dark"}
      />
    ) : (
      iconProp
    );

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

    return (
      <ClassNames>
        {({ cx, css }) => {
          const propsToPass = mergeProps(
            // Omit `onClick` from `otherProps` beacuse we'll be conditionally
            // calling it in the `onClick` handler depending on `mergedProps.disabled`.
            // Also exclude `className` beacuse we'll be combining it on
            // our own with `cx`. This is necessary because `cx` allows for
            // emotion styles to be logically overwritten.
            omit(
              mergedProps,
              "className",
              "onClick",
              // If we're overriding the default disabled behavior, then strip
              // it out from the props we'll pass to the element.
              overrideDisabledBehavior ? "disabled" : "",
            ),
            {
              "aria-disabled": mergedProps.disabled,
              onClick,
              onPointerEnter() {
                setIsPointerOver(true);
              },
              onPointerLeave() {
                setIsPointerOver(false);
              },
              className: cx(
                css([
                  {
                    "&:focus": {
                      outline: 0,
                    },
                  },
                  {
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
                          ? "0 1px 4px 0 rgba(18, 21, 26, 0.04), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
                          : "0 0 0 1px rgba(18, 21, 26, 0.2), 0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 1px 0 0 rgba(18, 21, 26, 0.05)",
                    }),

                    color: getTextColor({ color, feel, theme }),

                    cursor: mergedProps.disabled ? "default" : "pointer",

                    // Vertically center children
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",

                    height: getHeight({ size }),

                    minWidth: iconOnly
                      ? inputHeightDictionary[
                          size === "default" ? "standard" : size
                        ]
                      : endIcon
                      ? 0
                      : size === "small"
                      ? 76
                      : size === "default" || size === "standard"
                      ? 100
                      : size === "large"
                      ? 112
                      : assertUnreachable(size),

                    // We have to set the Y padding because browsers (at least Chrome) has
                    // a non-symmetrical vertical padding applied by default.
                    paddingLeft: iconOnly ? 0 : 12,
                    paddingRight: iconOnly ? 0 : endIcon ? 8 : 12,

                    ...(size === "small"
                      ? base.small
                      : size === "large"
                      ? base.large
                      : base.base),

                    fontWeight: 600,

                    // Disable the outline because we're setting a custom `:active` style
                    outline: 0,

                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  },

                  // We need to also set the `:hover` on `:disabled` so it has a
                  // higher specificity than any `:hover` classes passed in. This
                  // also means that both of these need to be overriden if we want
                  // to use a custom disabled color.
                  mergedProps.disabled
                    ? overrideDisabledBehavior
                      ? disabledStyles
                      : { "&[disabled], &[disabled]:hover": disabledStyles }
                    : {
                        ":hover, &[data-force-hover-state]": {
                          backgroundColor: getHoverBackgroundColor({
                            color,
                            feel,
                            theme,
                          }),
                          color: getTextColor({
                            color,
                            feel,
                            theme,
                            mode: ":hover",
                          }),
                          ...(feel !== "flat" && {
                            // The `box-shadow` property is copied directly from Zeplin
                            boxShadow:
                              theme === "light"
                                ? "0 5px 10px 0 rgba(18, 21, 26, 0.08), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
                                : "0 0 0 1px rgba(18, 21, 26, 0.2), 0 5px 10px 0 rgba(18, 21, 26, 0.12), 0 1px 0 0 rgba(18, 21, 26, 0.05)",
                          }),
                        },
                        // This is kind of hacky behavior
                        "&[data-force-focus-state]": focusedStyles,
                        "&:active, &[data-force-active-state], &[aria-expanded=true]": {
                          ...(getTextColor({
                            color,
                            feel,
                            theme,
                            mode: ":hover",
                          }) && {
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
                ]),
                mergedProps.className,
                isFocusVisible && css(focusedStyles),
              ),

              children: (
                <>
                  {icon && (
                    <ButtonIcon
                      iconSize={iconSize}
                      className={css({ margin: iconOnly ? 0 : "0 8px 0 0" })}
                    >
                      {icon}
                    </ButtonIcon>
                  )}

                  {children}
                  {endIcon && !loading && (
                    <ButtonIcon
                      iconSize={iconSize}
                      className={css({ margin: iconOnly ? 0 : `0 0 0 6px` })}
                    >
                      {endIcon}
                    </ButtonIcon>
                  )}
                </>
              ),
            },
          );

          return React.cloneElement(as, propsToPass);
        }}
      </ClassNames>
    );
  },
);
