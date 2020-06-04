/* eslint-disable @typescript-eslint/no-empty-interface */
/** @jsx jsx */
import * as CSS from "csstype";
import React from "react";
import { css, jsx } from "@emotion/core";
import { useMenuIconSize, useMenuColor } from "../MenuConfig";
import { useMenuItemClickListener } from "../MenuItemClickListener";
import tinycolor from "tinycolor2";
import { colors } from "../colors";

/* istanbul ignore next */
function assertUnreachable(value: never): never {
  throw new TypeError(`Unreachable value reached ${value}`);
}

function getIconHorizontalPadding(
  iconSize: ReturnType<typeof useMenuIconSize>
): CSS.PaddingProperty<number> {
  switch (iconSize) {
    case "normal":
      return 12;
    case "small":
      return 8;
    default:
      assertUnreachable(iconSize);
  }
}

function getIconSize(
  iconSize: ReturnType<typeof useMenuIconSize>
): CSS.WidthProperty<number> {
  switch (iconSize) {
    case "normal":
      return 16;
    case "small":
      return 10;
    default:
      assertUnreachable(iconSize);
  }
}

function getIconMarginLeft(
  iconSize: ReturnType<typeof useMenuIconSize>
): CSS.MarginLeftProperty<number> {
  switch (iconSize) {
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
  /** Icon to display at the end of a menu item.
   *
   * This element will always be rendered unless the value is `undefined`. If
   * you want an empty node, a spacer for example, use `null`
   */
  endIcon?: React.ReactNode;
  /**
   * Indicates if this menu item can be itneracted with. Defaults to `true`. If
   * set to `false`, there will be no hover effects.
   *
   * This is _not_ the same as `disabled`
   */
  interactive?: boolean;
  selected?: boolean;
  /** Icon to display at the start of a menu item.
   *
   * This element will always be rendered unless the value is `undefined`. If
   * you want an empty node, a spacer for example, use `null`
   */
  startIcon?: React.ReactNode;
}

export const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(
  (
    {
      children,
      endIcon,
      interactive = true,
      onClick,
      selected = false,
      startIcon,
      ...props
    },
    ref
  ) => {
    const iconSize = useMenuIconSize();
    const menuItemClickListener = useMenuItemClickListener();
    const menuColor = useMenuColor();

    const selectedTextColor = tinycolor
      .mostReadable(menuColor, [colors.white, colors.grey.darker], {
        level: "AA",
        size: "small",
      })
      .toString();
    const selectedBackgroundColor = menuColor;

    const selectedStyles = interactive && {
      backgroundColor: selectedBackgroundColor,
      color: selectedTextColor,
    };

    const hoverStyles = interactive && {
      backgroundColor: colors.silver.light,
    };

    /**
     * Handler to call `onClick` handler passed in props and also handler passed
     * via context
     */
    const delegatingOnClick = React.useCallback<React.MouseEventHandler<any>>(
      (event) => {
        if (onClick) onClick(event);
        if (menuItemClickListener) menuItemClickListener(event);
      },
      [menuItemClickListener, onClick]
    );

    return (
      <div
        {...props}
        onClick={delegatingOnClick}
        css={css({
          ...(selected && selectedStyles),
          ...{ "&[aria-expanded=true]": selectedStyles },
          ...(!selected && { "&:hover": hoverStyles }),
          cursor: interactive ? "pointer" : undefined,
          borderRadius: 4,
          display: "flex",
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
        })}
        ref={ref}
      >
        {typeof startIcon !== "undefined" && (
          <div
            css={css({
              flex: "none",
              height: 20,
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
            /* This is weird but it's necessary to truncate menu items */
            minWidth: 0,
          })}
        >
          {children}
        </div>
        {typeof endIcon !== "undefined" && (
          <div
            css={css({
              flex: "none",
              height: 20,
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
