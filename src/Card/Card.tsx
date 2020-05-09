/** @jsx jsx */
import { colors } from "../colors";
import { base } from "../typography";
import { jsx, ClassNames } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const descriptionMaxWidth = 760;

export interface CardProps
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
   * Override how the `header` is rendered. You can pass either an intrinisic
   * jsx element as a string (like "h1") or a react element (`<h1 />`)
   *
   * If you pass a react element, props that we add are spread onto the input.
   *
   * @default "h2"
   */
  headingAs?: React.ReactElement | keyof JSX.IntrinsicElements;

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
  headingAs = "h2",
  size,
  ...otherProps
}) => (
  <section
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
            <ClassNames>
              {({ css, cx }) => {
                const headingProps = {
                  className: cx(
                    css({
                      color: colors.black.base,
                      display: "flex",
                      fontWeight: 600,
                      marginBottom: 0,
                      marginTop: 0,
                      ...(size === "large" ? base.xlarge : base.large),
                    })
                  ),
                  children: heading,
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
          )}
          {description && (
            <div
              css={{
                ...base.base,
                color: colors.grey.base,
                maxWidth: actions ? descriptionMaxWidth : "",
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
  </section>
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
  <section
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
              maxWidth: actions ? descriptionMaxWidth : "",
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
    {actions && <div css={{ marginLeft: 16 }}>{actions}</div>}
  </section>
);

CardSection.propTypes = {
  heading: PropTypes.node,
  description: PropTypes.node,
  actions: PropTypes.node,
};

/**
 * A border line that can go between two card sections, with appropriate margin applied
 */
export const CardSeperator: React.FC<{ className?: string }> = ({
  className,
}) => (
  <hr
    className={className}
    css={{
      height: 1,
      borderWidth: 0,
      backgroundColor: colors.silver.dark,
      marginTop: 24,
      marginBottom: 24,
    }}
  />
);
