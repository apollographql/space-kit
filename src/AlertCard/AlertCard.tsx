/** @jsx jsx */
import { jsx, ClassNames } from "@emotion/core";
import React, { CSSProperties, Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { base } from "../typography";
import { IconClose } from "../icons/IconClose";
import { colors } from "../colors";
import { assertUnreachable } from "../shared/assertUnreachable";
import { IconInfoSolid } from "../icons/IconInfoSolid";
import { IconWarningSolid } from "../icons/IconWarningSolid";
import { IconErrorSolid } from "../icons/IconErrorSolid";
import { IconSuccessSolid } from "../icons/IconSuccessSolid";

interface AlertCardProps {
  /**
   * color theme for alert
   * @default "light"
   */
  theme?: "light" | "dark";

  heading: React.ReactNode;

  /**
   * actions could be a button
   * or a tooltip or anything the Alert should display after the children
   */
  actions?: React.ReactNode;

  /**
   * The content of the card, appears below the title
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

  /**
   * layout for longer content
   *
   * @default false
   */
  extended?: boolean;

  className?: string;
  style?: CSSProperties;

  /**
   * Type of alert, this is used to determine the color and icon in the title
   */
  type: "info" | "warn" | "error" | "success";
}

export const AlertCard: React.FC<AlertCardProps> = ({
  heading,
  onClose,
  actions,
  headingAs = "h2",
  children,
  theme = "light",
  extended = false,
  type,
  ...otherProps
}) => {
  const { Icon, color: colorTemp } = useMemo(() => {
    switch (type) {
      case "info":
        return { color: colors.blue, Icon: IconInfoSolid };
      case "warn":
        return { color: colors.orange, Icon: IconWarningSolid };
      case "error":
        return { color: colors.red, Icon: IconErrorSolid };
      case "success":
        return { color: colors.green, Icon: IconSuccessSolid };
      default:
        assertUnreachable(type);
    }
  }, [type]);
  return (
    <section
      {...otherProps}
      css={{
        backgroundColor:
          theme === "light"
            ? colors.white
            : theme === "dark"
            ? colors.black.lighter
            : assertUnreachable(theme),
        color:
          theme === "light"
            ? colors.black.base
            : theme === "dark"
            ? colors.white
            : assertUnreachable(theme),
        boxShadow: `0 4px 8px 0 rgba(0, 0, 0, .04)`,
        borderStyle: "solid",
        borderRadius: 4,
        borderWidth:
          theme === "light"
            ? 1
            : theme === "dark"
            ? 0
            : assertUnreachable(theme),
        borderColor: colors.silver.dark,
        padding: 15,
      }}
    >
      <div
        css={{
          marginBottom: extended ? 14 : 6,
          overflow: "hidden",
          display: "flex",
        }}
      >
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
                  color:
                    theme === "light"
                      ? colorTemp.darker
                      : theme === "dark"
                      ? colorTemp.lighter
                      : assertUnreachable(theme),
                  ...base.base,
                })
              ),
              children: (
                <Fragment>
                  <Icon
                    css={{
                      width: 20,
                      height: 20,
                      color: colorTemp.base,
                      marginRight: 13,
                      "& .inner": theme === "dark" &&
                        type !== "warn" && { fill: colors.white },
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

      {extended && (
        <hr
          css={{
            height: 1,
            borderWidth: 0,
            backgroundColor:
              theme === "light"
                ? colors.silver.dark
                : theme === "dark"
                ? colors.grey.dark
                : assertUnreachable(theme),
            marginTop: 14,
            marginBottom: 14,
          }}
        />
      )}
      <div css={{ marginLeft: extended ? 0 : 33 }}>
        <div
          css={{
            ...base.small,
            marginBottom: actions ? 13 : 0,
          }}
        >
          {children}
        </div>

        {actions}
      </div>
    </section>
  );
};

AlertCard.propTypes = {
  extended: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  heading: PropTypes.node.isRequired,
  actions: PropTypes.node,
  type: PropTypes.oneOf(["info", "warn", "error", "success"] as const)
    .isRequired,
  headingAs: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired as any, // Using PropTypes.string to match keyof JSX.IntrinsicElements
  ]),
};