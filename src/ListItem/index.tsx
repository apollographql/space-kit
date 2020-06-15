/* eslint-disable @typescript-eslint/no-empty-interface */
/** @jsx jsx */
import * as CSS from "csstype";
import React from "react";
import { css, jsx } from "@emotion/core";
import { assertUnreachable } from "../shared/assertUnreachable";
import tinycolor from "tinycolor2";
import { colors } from "../colors";
import { useListConfig } from "../ListConfig";
import { verticalListMarginFromPadding } from "../shared/verticalListMarginFromPadding";

function getIconHorizontalPadding(
  iconSize: NonNullable<ReturnType<typeof useListConfig>["iconSize"]>
): CSS.PaddingProperty<number> {
  switch (iconSize) {
    case "large":
      return 16;
    case "normal":
      return 12;
    case "small":
      return 8;
    default:
      assertUnreachable(iconSize);
  }
}

function getIconSize(
  iconSize: NonNullable<ReturnType<typeof useListConfig>["iconSize"]>
): CSS.WidthProperty<number> {
  switch (iconSize) {
    case "large":
      return 18;
    case "normal":
      return 16;
    case "small":
      return 10;
    default:
      assertUnreachable(iconSize);
  }
}

function getIconMarginLeft(
  iconSize: NonNullable<ReturnType<typeof useListConfig>["iconSize"]>
): CSS.MarginLeftProperty<number> {
  switch (iconSize) {
    case "large":
    case "normal":
      return "initial";
    case "small":
      return -7;
    default:
      assertUnreachable(iconSize);
  }
}

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "onClick"
  > {
  className?: string;
  /** Icon to display at the end of a list item.
   *
   * This element will always be rendered unless the value is `undefined`. If
   * you want an empty node, a spacer for example, use `null`
   */
  endIcon?: React.ReactNode;
  /**
   * Indicates if this list item can be itneracted with. Defaults to `true`. If
   * set to `false`, there will be no hover effects.
   *
   * This is _not_ the same as `disabled`
   */
  interactive?: boolean;
  selected?: boolean;
  /** Icon to display at the start of a list item.
   *
   * This element will always be rendered unless the value is `undefined`. If
   * you want an empty node, a spacer for example, use `null`
   */
  startIcon?: React.ReactNode;
}

export const ListItem = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(
  (
    {
      children,
      endIcon,
      interactive = true,
      selected = false,
      startIcon,
      ...props
    },
    ref
  ) => {
    const { hoverColor, iconSize, padding, selectedColor } = useListConfig();

    const selectedTextColor = tinycolor
      .mostReadable(selectedColor, [colors.white, colors.grey.darker], {
        level: "AA",
        size: "small",
      })
      .toString();
    const selectedBackgroundColor = selectedColor;

    const selectedStyles = interactive && {
      backgroundColor: selectedBackgroundColor,
      color: selectedTextColor,
    };

    const hoverStyles = interactive && {
      backgroundColor: hoverColor,
      color: tinycolor
        .mostReadable(hoverColor, [colors.white, colors.grey.darker], {
          level: "AA",
          size: "small",
        })
        .toString(),
    };

    const verticalMargin = verticalListMarginFromPadding(padding) / 2;

    return (
      <div
        {...props}
        css={css({
          ...(selected && selectedStyles),
          ...{ "&[aria-expanded=true]": selectedStyles },
          ...(!selected && {
            "&:hover, &[data-force-hover-state]": hoverStyles,
          }),
          alignItems: "center",
          cursor: interactive ? "pointer" : undefined,
          borderRadius: 4,
          display: "flex",
          height:
            padding === "normal"
              ? 28
              : padding === "relaxed"
              ? 40
              : assertUnreachable(padding),
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
          marginTop: verticalMargin,
          marginBottom: verticalMargin,
        })}
        ref={ref}
      >
        {typeof startIcon !== "undefined" && (
          <div
            css={css({
              display: "flex",
              flex: "none",
              marginLeft: getIconMarginLeft(iconSize),
              marginRight: getIconHorizontalPadding(iconSize),
              width: getIconSize(iconSize),
            })}
          >
            {startIcon}
          </div>
        )}
        <div
          css={css({
            flex: "1",
            /* This is weird but it's necessary to truncate list items */
            minWidth: 0,
          })}
        >
          {children}
        </div>
        {typeof endIcon !== "undefined" && (
          <div
            css={css({
              display: "flex",
              flex: "none",
              justifyContent: "flex-end",
              marginLeft: getIconHorizontalPadding(iconSize),
              width: getIconSize(iconSize),
            })}
          >
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
