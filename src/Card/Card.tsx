/** @jsx jsx */
import { colors } from "../colors";
import { base } from "../typography";
import { jsx } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";

interface CardProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    CardSectionProps {
  /**
   * The content of the card,
   * appears below the title and description
   */
  children?: React.ReactNode;

  /**
   * large has bigger heading & smaller padding than standard
   */
  size?: "standard" | "large";
}

export const Card: React.FC<CardProps> = ({
  children,
  heading,
  actions,
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
      borderStyle: "solid",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.silver.dark,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: size === "large" ? 16 : 28,
      paddingBottom: size === "large" ? 16 : 28,
    }}
  >
    <div css={{ display: "flex", marginBottom: children ? 24 : 0 }}>
      <div
        css={{
          flex: "1 1 0%",
          marginRight: "auto",
          overflow: "hidden",
        }}
      >
        <div>
          {heading && (
            <div
              css={{
                display: "flex",
                color: colors.black.base,
                ...(size === "large" ? base.xlarge : base.large),
              }}
            >
              <span
                css={{
                  fontWeight: 600,
                  flex: "1 1 0%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  paddingRight: 24,
                }}
              >
                {heading}
              </span>
            </div>
          )}
          {description && (
            <div
              css={{
                ...base.base,
                color: colors.grey.base,
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
      {actions && <div css={{ marginLeft: 16 }}>{actions}</div>}
    </div>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.node,
  description: PropTypes.node,
  actions: PropTypes.node,
  size: PropTypes.oneOf<CardProps["size"]>(["standard", "large"]),
};

interface CardSectionProps {
  heading?: React.ReactNode;

  /**
   * the description for this card
   * appears in grey below the title
   */
  description?: React.ReactNode;

  /**
   * actions could be a button
   * or a tooltip or anything the card should display
   * aligned with the title on the right
   */
  actions?: React.ReactNode;
}

export const CardSection: React.FC<CardSectionProps> = ({
  heading,
  description,
  actions,
}) => (
  <div
    css={{
      display: "flex",
      marginTop: 24,
    }}
  >
    <div css={{ flex: "1 1 0%", marginRight: "auto" }}>
      <div>
        {heading && (
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
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                paddingRight: 24,
              }}
            >
              {heading}
            </span>
          </div>
        )}
        {description && (
          <div
            css={{
              ...base.base,
              color: colors.grey.base,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
    {actions && <div css={{ marginLeft: 16 }}>{actions}</div>}
  </div>
);

CardSection.propTypes = {
  heading: PropTypes.node,
  description: PropTypes.node,
  actions: PropTypes.node,
};

/**
 * A border line that can go between two card sections, with appropriate margin applied
 */
export const CardSeperator: React.FC = () => (
  <hr
    css={{
      height: 1,
      borderWidth: 0,
      backgroundColor: colors.silver.dark,
      marginTop: 24,
      marginBottom: 24,
    }}
  />
);
