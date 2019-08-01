/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { IconAlertSolid } from "../icons/IconAlertSolid";

interface Props {
  /**
   * Visible description
   */
  description?: React.ReactNode;

  /**
   * Defaults to standard
   */
  size: "small" | "standard" | "large";

  /**
   * Visible title
   */
  label?: React.ReactNode;

  /**
   * If true, the helperText is red with error icon
   */
  error?: boolean;

  /**
   * Displayed below the input
   */
  helperText?: React.ReactNode;

  /**
   * Displayed to the left of the helperText, an info icon for example
   */
  helperIcon?: React.ReactNode;

  /**
   * an icon to have at the right of the input box, a search for example
   */
  icon?: React.ReactNode;

  /**
   * generally a Stepper or an Input component
   */
  children: React.ReactNode;
}

export function FormWrapper({
  label,
  description,
  size = "standard",
  helperText,
  helperIcon,
  icon,
  error,
  children,
  ...otherProps
}: Props): ReturnType<React.FC> {
  return (
    <div {...otherProps}>
      <label
        css={{
          paddingBottom: 8,
          ...typography.base.base,
          fontWeight: 600,
        }}
      >
        {label}
        <div
          css={{
            ...typography.base.base,
            color: colors.black.base,
            paddingBottom: 8,
          }}
        >
          {description}
        </div>
        {icon && (
          <div
            css={{
              position: "absolute",
              display: "inline-flex",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {icon}
          </div>
        )}
        {children}
      </label>
      <div
        css={{
          marginTop: 8,
          alignItems: "center",
          position: "relative",
        }}
      >
        {helperText && (
          <div
            css={{
              alignItems: "center",
              pointerEvents: "none",
              marginTop: 8,
              marginRight: 8,
              paddingLeft: size === "small" ? 8 : 12,
            }}
          >
            <div
              css={{
                ...typography.base.small,
                color: error ? colors.red.base : colors.grey.base,
                display: "flex",
              }}
            >
              <div css={{ marginRight: 8 }}>
                {error ? (
                  <IconAlertSolid css={{ width: 16, height: 16 }} />
                ) : (
                  helperIcon
                )}
              </div>
              {helperText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
