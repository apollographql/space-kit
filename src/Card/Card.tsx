/** @jsx jsx */
import * as colors from "../colors";
import { base } from "../typography";
import { jsx } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";

interface Props {
  children?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  titleChildren?: React.ReactNode;
  forceNoChildPadding?: boolean;
  size?: "standard" | "large";
}

export const Card: React.FunctionComponent<Props> = ({
  children,
  forceNoChildPadding,
  title,
  titleChildren,
  description,
  size,
  ...otherProps
}) => (
  <div
    {...otherProps}
    css={{
      backgroundColor: colors.white,
      color: colors.black.base,
      boxShadow: `0 4px 8px 0 rgba(0, 0, 0, .04)`,
      borderRadius: `0.5rem`,
      borderWidth: 1,
      borderColor: colors.silver.dark,
      paddingLeft: 24,
      paddingRight: 24,
      margin: "2rem",
      paddingTop: size === "large" ? 16 : 28,
      paddingBottom: size === "large" ? 16 : 28,
    }}
  >
    <div css={{ display: "flex" }}>
      <div css={{ flex: "1 1 0%" }}>
        <div css={{ display: "block" }}>
          {title && (
            <div
              css={{
                display: "flex",
                color: colors.black.base,
                ...(size === "large" ? base.xxlarge : base.large),
              }}
            >
              <span
                css={{
                  fontWeight: 600,
                  flex: "1 1 0%",
                  lineHeight: 1.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  paddingRight: "1rem",
                }}
              >
                {title}
              </span>
            </div>
          )}
          {description && (
            <div
              css={{
                ...base.base,
                color: colors.grey.base,
                maxWidth: titleChildren ? "42rem" : "",
                paddingBottom:
                  !!children && !forceNoChildPadding ? "1.5rem" : "",
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
      {titleChildren && (
        <div css={{ flex: "none", marginLeft: "1rem" }}>{titleChildren}</div>
      )}
    </div>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.node,
  titleChildren: PropTypes.node,
  forceNoChildPadding: PropTypes.bool,
  size: PropTypes.oneOf<Props["size"]>(["standard", "large"]),
};
