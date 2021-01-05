/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { css, jsx } from "@emotion/core";
import React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { useFormControlContext } from "../FormControl";
import { inputHeightDictionary } from "../shared/inputHeightDictionary";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size" | "type"
  > {
  /**
   * Size of text and padding inside the input
   *
   * Defaults to `standard`
   */
  size?: keyof typeof inputHeightDictionary;

  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

/**
 * Component that decorates an `input`
 *
 * `className` and `style` are not available on the props because it would not
 * be obvious where those props would be added in the DOM. To add a `className`
 * to either the containing `div` or the underlying `input`, you must use
 * `containerAs` and `inputAs`.
 */
export const Input: React.FC<Props> = ({
  size = "standard",
  type = "text",
  ...props
}) => {
  const {
    describedBy,
    endAdornment,
    labelledBy,
    hasError,
    id,
    startAdornment,
  } = useFormControlContext();

  return (
    <input
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={hasError || undefined}
      type={type}
      {...props}
      css={css({
        backgroundColor: props.disabled ? colors.silver.light : colors.white,
        border: "solid 1px",
        borderColor: hasError ? colors.red.base : colors.silver.darker,
        "::placeholder": {
          color: props.disabled ? colors.grey.lighter : colors.grey.light,
          opacity: 1,
        },
        borderRadius: 4,
        flex: 1,
        height: inputHeightDictionary[size],
        ...(size === "small" ? typography.base.small : typography.base.base),
        paddingLeft: startAdornment ? 34 : size === "small" ? 8 : 10,
        paddingRight: endAdornment ? 34 : size === "small" ? 8 : 10,
        width: "100%",
        ":hover,  &[data-force-hover-state]": {
          borderColor: !props.disabled
            ? colors.grey.light
            : hasError
            ? colors.red.base
            : colors.silver.darker,
        },
        ":focus, &[data-force-focus-state]": {
          borderColor: !props.disabled
            ? colors.blue.light
            : hasError
            ? colors.red.base
            : colors.silver.darker,
          outline: "none",
        },
      })}
    />
  );
};
