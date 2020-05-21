/** @jsx jsx */
import { jsx, ClassNames } from "@emotion/core";
import React, { CSSProperties, Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { base } from "../typography";
import { IconClose } from "../icons/IconClose";
import { colors, PaletteColor } from "../colors";
import { getOffsetInPalette } from "../colors/utils/getOffsetInPalette";

interface AlertProps {
  /**
   * color theme for alert
   * @default "light"
   */
  theme?: "light" | "dark";

  /**
   * The color used for the heading and icon, the heading text will be 2 shades darker
   */
  color: PaletteColor;

  /**
   * The icon displayed to the left of the heading
   */
  Icon: React.ComponentType<{ className?: string }>;

  heading: React.ReactNode;

  /**
   * actions could be a button
   * or a tooltip or anything the card should display
   * aligned with the title on the right
   */
  actions?: React.ReactNode;

  /**
   * The content of the card,
   * appears below the title and description
   */
  children?: React.ReactNode;

  /**
   * Override how the `header` is rendered. You can pass either an intrinisic
   * jsx element as a string (like "h1") or a react element (`<h1 />`)
   *
   * If you pass a react element, props that we add are spread onto the input.
   *
   * @default "h2"
   */
  headingAs?: React.ReactElement | keyof JSX.IntrinsicElements;

  /**
   * callback for handling the clicks on the close button.
   */
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({
  heading,
  onClose,
  actions,
  headingAs = "h2",
  children,
  color,
  Icon,
  theme = "light",
  ...otherProps
}) => {
  return (
    <section
      {...otherProps}
      css={{
        backgroundColor:
          theme === "light" ? colors.white : colors.black.lighter,
        color: theme === "light" ? colors.black.base : colors.white,
        boxShadow: `0 4px 8px 0 rgba(0, 0, 0, .04)`,
        borderStyle: "solid",
        borderRadius: 4,
        borderWidth: theme === "light" ? 1 : 0,
        borderColor: colors.silver.dark,
        padding: 15,
      }}
    >
      <div css={{ marginBottom: 14, overflow: "hidden", display: "flex" }}>
        <ClassNames>
          {({ css, cx }) => {
            const headingProps = {
              className: cx(
                css({
                  fontWeight: 600,
                  marginBottom: 0,
                  marginTop: 0,
                  width: "100%",
                  display: "flex",
                  color: getOffsetInPalette(
                    2,
                    theme === "light" ? "darker" : "lighter",
                    color
                  ),
                  ...base.base,
                })
              ),
              children: (
                <Fragment>
                  <Icon
                    css={{
                      width: 20,
                      height: 20,
                      color,
                      marginRight: 13,
                    }}
                  />
                  {heading}
                </Fragment>
              ),
            };

            return React.isValidElement(headingAs)
              ? React.cloneElement(headingAs, {
                  ...headingProps,
                  className: classnames(
                    headingProps.className,
                    headingAs.props.className
                  ),
                })
              : React.createElement(headingAs, headingProps);
          }}
        </ClassNames>
        <IconClose
          onClick={onClose}
          css={{
            color: colors.grey.lighter,
            cursor: "pointer",
            width: 10,
            height: 10,
          }}
        />
      </div>

      <hr
        css={{
          height: 1,
          borderWidth: 0,
          backgroundColor: colors.silver.dark,
          marginTop: 14,
          marginBottom: 14,
        }}
      />

      <div
        css={{
          fontSize: 13,
          lineHeight: "1.5",
          marginBottom: actions ? 13 : 0,
        }}
      >
        {children}
      </div>
      {actions}
    </section>
  );
};

Alert.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  heading: PropTypes.node.isRequired,
  actions: PropTypes.node,
  color: PropTypes.oneOf(
    (Object.values(colors)
      .map((color) => Object.values(color))
      .reduce((a, b) => a.concat(b)) as any) as PaletteColor[]
  ).isRequired,
  Icon: PropTypes.func.isRequired,
};
