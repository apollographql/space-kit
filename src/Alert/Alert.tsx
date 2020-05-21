/** @jsx jsx */
import { jsx, ClassNames } from "@emotion/core";
import React, { useMemo, CSSProperties, Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { base } from "../typography";
import { IconErrorSolid } from "../icons/IconErrorSolid";
import { IconInfoSolid } from "../icons/IconInfoSolid";
import { IconWarningSolid } from "../icons/IconWarningSolid";
import { IconSuccessSolid } from "../icons/IconSuccessSolid";
import { IconClose } from "../icons/IconClose";
import { colors } from "../colors";

type AlertLevel = "info" | "warn" | "error" | "success";

interface AlertProps {
  heading?: React.ReactNode;

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

  level: AlertLevel;
  /**
   * callback for handling the clicks on the close button.
   */
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({
  level,
  heading,
  onClose,
  actions,
  headingAs = "h2",
  children,
  ...otherProps
}) => {
  const { Icon, color } = useMemo(() => {
    switch (level) {
      case "info":
        return { color: colors.blue, Icon: IconInfoSolid };
      case "warn":
        return { color: colors.orange, Icon: IconWarningSolid };
      case "error":
        return { color: colors.red, Icon: IconErrorSolid };
      case "success":
        return { color: colors.green, Icon: IconSuccessSolid };
      default:
        return {};
    }
  }, [level]);

  return (
    <section
      {...otherProps}
      css={{
        backgroundColor: colors.white,
        color: colors.black.base,
        boxShadow: `0 4px 8px 0 rgba(0, 0, 0, .04)`,
        borderStyle: "solid",
        borderRadius: 4,
        borderWidth: 1,
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
                  color: color?.darker,
                  ...base.base,
                })
              ),
              children: (
                <Fragment>
                  {Icon && (
                    <Icon
                      css={{
                        width: 20,
                        height: 20,
                        color: color?.base,
                        marginRight: 13,
                      }}
                    />
                  )}
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
  level: PropTypes.oneOf(["info", "warn", "error", "success"] as AlertLevel[])
    .isRequired,
  onClose: PropTypes.func.isRequired,
};
