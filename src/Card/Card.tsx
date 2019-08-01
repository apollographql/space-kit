/** @jsx jsx */
import * as colors from "../colors";
import { base } from "../typography";
import { jsx } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";

interface Props {
  /**
   * The content of the card,
   * appears below the title and description
   */
  children?: React.ReactNode;
  /**
   * the title of the card
   */
  title?: React.ReactNode;
  /**
   * extra class names
   * applied to the outer most div
   */
  className?: string;
  /**
   * the description for this card
   * appears in grey below the title
   */
  description?: React.ReactNode;
  /**
   * titleChildren could be a button
   * or a tooltip or anything the card should display
   * aligned with the title on the right
   */
  titleChildren?: React.ReactNode;
  /**
   * pass forceNoChildPadding={true} if your card will have hidden children
   * for example, a card with a drawer will read as having children,
   * but you don't want the padding associated with a child
   */
  forceNoChildPadding?: boolean;
  /**
   * cards can be standard (18px text, larger padding)
   * or large (24px text, smaller padding)
   */
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
    <div
      css={{
        paddingBottom: -!!children && !forceNoChildPadding ? 24 : "",
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
                    paddingRight: 24,
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

interface SectionProps {
  border?: boolean;
}

export const CardSection: React.FunctionComponent<Props & SectionProps> = ({
  title,
  description,
  titleChildren,
  border,
}) => (
  <div
    css={{
      display: "flex",
      paddingTop: 24,
      border: border ? "1px" : "",
      borderColor: colors.silver.base,
    }}
  >
    <div css={{ flex: "1 1 0%" }}>
      <div css={{ display: "block" }}>
        {title && (
          <div
            css={{
              display: "flex",
              color: colors.black.base,
              ...base.base,
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
                paddingRight: 24,
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
);

CardSection.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  titleChildren: PropTypes.node,
  forceNoChildPadding: PropTypes.bool,
  border: PropTypes.bool,
};
