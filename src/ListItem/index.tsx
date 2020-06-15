/* eslint-disable @typescript-eslint/no-empty-interface */
import * as CSS from "csstype";
import classnames from "classnames";
import React from "react";
import { ClassNames } from "@emotion/core";
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
    "className" | "onClick" | "style"
  > {
  /**
   * Override the the default element used to render
   *
   * All props provided will be merged with props that this component adds,
   * including `className`s being merged.
   *
   * @default <div />
   */
  as?: React.ReactElement;

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

export const ListItem = React.forwardRef<any, React.PropsWithChildren<Props>>(
  (
    {
      as = <div />,
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
      <ClassNames>
        {({ css, cx }) => {
          const result = (
            <div
              {...props}
              className={cx(
                css({
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
                })
              )}
              ref={ref}
            >
              {typeof startIcon !== "undefined" && (
                <div
                  className={cx(
                    css({
                      display: "flex",
                      flex: "none",
                      marginLeft: getIconMarginLeft(iconSize),
                      marginRight: getIconHorizontalPadding(iconSize),
                      width: getIconSize(iconSize),
                    })
                  )}
                >
                  {startIcon}
                </div>
              )}
              <div
                className={cx(
                  css({
                    flex: "1",
                    /* This is weird but it's necessary to truncate list items */
                    minWidth: 0,
                  })
                )}
              >
                {children}
              </div>
              {typeof endIcon !== "undefined" && (
                <div
                  className={cx(
                    css({
                      display: "flex",
                      flex: "none",
                      justifyContent: "flex-end",
                      marginLeft: getIconHorizontalPadding(iconSize),
                      width: getIconSize(iconSize),
                    })
                  )}
                >
                  {endIcon}
                </div>
              )}
            </div>
          );

          return React.cloneElement(as, {
            ...result.props,
            className: classnames(
              result.props.className,
              props.className,
              // If the parent component is using emotion with the jsx pragma, we
              // have to get fancy and intercept the styles to use with the
              // `ClassNames` wrapper.
              as.props.css ? cx(css(as.props.css.styles)) : null
            ),
            style: { ...result.props.style, ...props.style },
            ref: as.props.ref ?? ref,
          });
        }}
      </ClassNames>
    );
  }
);
