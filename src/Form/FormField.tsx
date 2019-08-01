/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { FormWrapper } from "./FormWrapper";
import PropTypes from "prop-types";

interface Props {
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

  /**
   * Defaults to standard
   */
  size?: "small" | "standard" | "large";

  /**
   * If true, the user won't be able to interact with any input
   */
  disabled?: boolean;

  /**
   * If true, the helperText and input are red with error icon
   */
  error?: boolean;

  /**
   * Visible description, displayed above input
   */
  description?: React.ReactNode;

  /**
   * Visible label, displayed above input
   */
  label?: React.ReactNode;

  /**
   * Displayed below the input
   */
  helperText?: React.ReactNode;

  /**
   * Displayed to the left of the helperText, an info icon for example
   */
  helperIcon?: React.ReactNode;

  /**
   * an icon to have at the left of the input box, a search icon for example
   */
  icon?: React.ReactNode;
}

export function FormField({
  label,
  description,
  size = "standard",
  disabled,
  icon,
  error,
  helperText,
  helperIcon,
  inputProps,
  ...otherProps
}: Props): ReturnType<React.FC> {
  return (
    <FormWrapper
      description={description}
      label={label}
      size={size}
      icon={icon}
      helperText={helperText}
      helperIcon={helperIcon}
      error={error}
      {...otherProps}
    >
      <input
        {...inputProps}
        disabled={disabled}
        css={{
          position: "relative",
          width: "100%",
          flex: 1,
          marginRight: icon ? -30 : 0,
          paddingLeft: icon ? 30 : size === "small" ? 8 : 12,
          paddingRight: size === "small" ? 8 : 12,
          margin: 0,
          height: size === "standard" ? 36 : size === "small" ? 28 : 42,
          ...(size === "small" ? typography.base.small : typography.base.base),
          backgroundColor: disabled ? colors.silver.light : colors.white,
          border: "solid 1px",
          borderRadius: 4,
          borderColor: error ? colors.red.base : colors.silver.darker,
          "::placeholder": {
            color: disabled ? colors.grey.lighter : colors.grey.light,
            opacity: 1,
          },
          ":focus, &[data-force-focus-state]": {
            borderColor:
              !disabled && !error
                ? colors.blue.light
                : error
                ? colors.red.base
                : colors.silver.darker,
            outline: "none",
          },
          ":hover,  &[data-force-hover-state]": {
            borderColor:
              !disabled && !error
                ? colors.grey.light
                : error
                ? colors.red.base
                : colors.silver.darker,
          },
        }}
      />
    </FormWrapper>
  );
}

FormField.propTypes = {
  disabled: PropTypes.bool,
  description: PropTypes.element,
  size: PropTypes.oneOf(["small", "standard", "large"]),
  label: PropTypes.element,
  error: PropTypes.bool,
  helperText: PropTypes.element,
  helperIcon: PropTypes.element,
  icon: PropTypes.element,
};
