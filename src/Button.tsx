/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { ComponentProps } from "react";
import * as colors from "./colors";
import * as CSS from "csstype";
import { base } from "./typography";

// Types that could use some improvement:
// * Don't allow `children` and `icon` to be missing
// * Don't allow `children` when `FAB`
//
// I was able to get guarantees to work, but only with very cryptic errors. I
// decided it'd be best, for the time being, to `throw` if we use things
// incorrectly.
interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /**
   * Treat this button as a floating action button
   *
   * You must include an `icon` prop and you must _not_ include a `children`
   * prop for a floating action button.
   */
  fab?: boolean;

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
   * Which variant to display
   *
   * The options are as follows:
   *
   * - `normal`: A button with a border and a background
   * - `simple`: No border or background (overrideable).
   *     - This will require you adding an `:active` style in addition to `:hover`
   */
  variant?: "normal" | "simple";
}

/**
 * Style system for Space Kit buttons
 *
 * This is intended to be used as an abstraction for your project's style guide.
 * There are way too many configuration options to use this component directly.
 *
 * @see https://zpl.io/amdN6Pr
 */
export const Button: React.FC<Props> = ({
  children,
  disabled = false,
  fab = false,
  icon,
  size = "default",
  variant = "normal",
  ...otherProps
}) => {
  /**
   * Icon size in pixels
   *
   * This is stored so we can use the same value for `height` and `width`
   */
  const iconSize = size === "small" ? 12 : size === "large" ? 24 : 16;

  const iconOnly = !children;

  if (fab) {
    if (!icon) {
      throw new TypeError("FAB buttons are required to have an `icon`");
    } else if (children) {
      throw new TypeError("FAB buttons cannot have children, only an `icon`");
    }
  }

  return (
    <button
      {...otherProps}
      disabled={disabled}
      css={[
        {
          "&[disabled]": {
            backgroundColor: colors.silver.dark,
            color: colors.grey.light,

            // We need to also set the `:hover` on `:disabled` so it has a higher
            // specificity than any `:hover` classes passed in. This also means
            // that both of these need to be overriden if we want to use a custom
            // disabled color.
            ":hover": {
              backgroundColor: colors.silver.dark,
              color: colors.grey.light
            }
          }
        },

        variant === "simple" && { backgroundColor: "transparent" },
        {
          borderRadius: fab ? "100%" : 4,

          borderWidth: 0,
          ...(variant === "normal" && {
            boxShadow:
              "0 1px 4px 0 rgba(18, 21, 26, 0.08), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
          }),

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

          padding: size === "small" ? `5px 8px` : size === "large" ? 8 : 7
        },
        {
          ...(size === "small"
            ? base.small
            : size === "large"
            ? base.large
            : base.base)
        },
        !disabled && {
          ":hover, &[data-force-hover-state]": {
            backgroundColor: colors.silver.base,
            cursor: "pointer",
            ...(variant === "normal" && {
              // The `box-shadow` property is copied directly from Zeplin
              boxShadow:
                "0 5px 10px 0 rgba(18, 21, 26, 0.12), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
            })
          }
        },
        {
          fontWeight: 600,

          // Disable the outline because we're setting a custom `:active` style
          outline: 0,

          ":focus, &[data-force-focus-state]": {
            // The `box-shadow` property is copied directly from Zeplin
            boxShadow:
              "0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 0 0 2px #bbdbff, inset 0 0 0 1px #2075d6, inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
          }
        },

        // This must come after `:focus` or the `:focus` state will override `:active`
        !disabled && {
          "&:active, &[data-force-active-state]": {
            // The `box-shadow` property is copied directly from Zeplin
            boxShadow: "inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05), inset 0 2px 2px 0 rgba(18, 21, 26, 0.12)",
            outline: 0,
          }
        },
      ]}
    >
      <div
        css={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {icon && (
          <span
            css={{
              display: "inline-block",
              height: iconSize,
              margin: iconOnly ? "3px 0" : "0 4px 0",
              width: iconSize
            }}
          >
            {icon}
          </span>
        )}
        {children && <span>{children}</span>}
      </div>
    </button>
  );
};

export const PrimaryButton: React.FC<ComponentProps<typeof Button>> = () =>
  null;
