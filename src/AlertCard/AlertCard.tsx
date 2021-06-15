/** @jsx jsx */
/** @jsxFrag React.Fragment */
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
import { Button } from "../Button";
import { useSpaceKitProvider } from "../SpaceKitProvider";

interface AlertCardProps {
  /**
   * Override the the default element
   *
   * All props provided will be merged with props that this component adds,
   * including `className`s being merged using emotion's `cx` function
   *
   * @default "section"
   */
  as?: React.ReactElement | keyof JSX.IntrinsicElements;

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
   * whether or not to include the 'x' button
   * which calls 'onClose'
   */
  dismissable: boolean;

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
  as = "section",
  heading,
  onClose,
  dismissable = true,
  actions,
  headingAs = "h2",
  children,
  theme: propTheme,
  extended = false,
  type,
  ...otherProps
}) => {
  const { theme: providerTheme } = useSpaceKitProvider();
  const theme = propTheme || providerTheme;

  const { Icon, color } = useMemo(() => {
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
    <ClassNames>
      {({ css, cx }) =>
        React.cloneElement(
          React.isValidElement(as)
            ? as
            : typeof as === "string"
            ? React.createElement(as)
            : assertUnreachable(as),
          {
            ...otherProps,
            className: cx(
              css({
                backgroundColor:
                  theme === "light"
                    ? colors.white
                    : theme === "dark"
                    ? colors.midnight.darker
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
              }),
              otherProps.className,
              React.isValidElement(as) && as.props.className,
            ),
          },
          <>
            <div
              css={{
                marginBottom: extended ? 14 : 6,
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
                            ? color.darker
                            : theme === "dark"
                            ? color.lighter
                            : assertUnreachable(theme),
                        ...base.base,
                      }),
                    ),
                    children: (
                      <Fragment>
                        <Icon
                          css={{
                            width: 20,
                            height: 20,
                            color: color.base,
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
                          headingAs.props.className,
                        ),
                      })
                    : React.createElement(headingAs, headingProps);
                }}
              </ClassNames>
              {dismissable && (
                <Button
                  onClick={onClose}
                  size="small"
                  feel="flat"
                  theme={theme}
                  css={{
                    marginRight: -9,
                    marginTop: -9,
                    color:
                      theme === "light"
                        ? colors.grey.lighter
                        : colors.midnight.lighter,
                    ":hover": {
                      backgroundColor: "transparent",
                      color:
                        theme === "light"
                          ? colors.grey.light
                          : colors.midnight.lightest,
                    },
                  }}
                  color={
                    {
                      light: colors.grey.lighter,
                      dark: colors.midnight.lighter,
                    }[theme]
                  }
                  icon={
                    <IconClose
                      css={{
                        width: 10,
                        height: 10,
                      }}
                    />
                  }
                />
              )}
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
                      ? colors.midnight.base
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
          </>,
        )
      }
    </ClassNames>
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
