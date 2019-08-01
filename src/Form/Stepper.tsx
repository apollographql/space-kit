/** @jsx jsx */
import { colors } from "../colors";
import { base } from "../typography";
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconPlus } from "../icons/IconPlus";
import { IconMinus } from "../icons/IconMinus";
import { FormWrapper } from "./FormWrapper";

const stepperWidth = 108;

export type StepperLimit = "min" | "max";

interface Props {
  /**
   * prefilled value
   */
  initialValue: number;

  /**
   * accepts a number, not an event, since we only call onChange
   * when the number should change, not when the user tries to change it
   */
  onChange: (value: number | undefined) => void;

  /**
   * callback when stepper is at min / max
   */
  onLimitReached?: (direction: StepperLimit) => void;
  min?: number;
  max?: number;
  disabled?: boolean;

  /**
   * Visible description
   */
  description?: React.ReactNode;

  /**
   * Defaults to standard
   */
  size?: "small" | "standard" | "large";

  /**
   * Visible title
   */
  label?: React.ReactNode;

  /**
   * If true, the helperText and stepper are red with error icon
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
}

export const Stepper: React.FC<Props> = ({
  initialValue,
  onChange,
  onLimitReached,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disabled,
  description,
  label,
  size = "standard",
  helperText,
  helperIcon,
  error,
  ...otherProps
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<number>(initialValue);
  const atMax = value !== undefined && value >= max;
  const atMin = value !== undefined && value <= min;

  const handleChange = (newValue: number | undefined) => {
    if (newValue !== undefined && newValue < min) {
      setValue(min);
      if (onLimitReached) onLimitReached("min");
    } else if (newValue !== undefined && newValue > max) {
      setValue(max);
      if (onLimitReached) onLimitReached("max");
    } else if (newValue !== undefined && newValue !== value) {
      setValue(newValue);
    }
    onChange(value);
  };

  const onIncrement = () => {
    if (!atMax) {
      handleChange((value || 0) + 1);
    } else if (onLimitReached) {
      onLimitReached("max");
    }
  };

  const onDecrement = () => {
    if (!atMin) {
      handleChange((value || 0) - 1);
    } else if (onLimitReached) {
      onLimitReached("min");
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    handleChange(value);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      handleChange(newValue);
    } else {
      handleChange(undefined);
    }
  };

  return (
    <FormWrapper
      description={description}
      label={label}
      error={error}
      size={size}
      helperText={helperText}
      helperIcon={helperIcon}
      {...otherProps}
    >
      <div
        {...otherProps}
        css={{
          maxWidth: stepperWidth,
          paddingLeft: 8,
          paddingRight: 8,
          backgroundColor: disabled ? colors.silver.light : colors.white,
          border: "1px solid",
          borderColor: error
            ? colors.red.base
            : focused
            ? colors.blue.base
            : colors.silver.darker,
          borderRadius: 4,
          "&[data-force-focus-state]": {
            borderColor: colors.blue.base,
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
      >
        <div
          css={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <button
            type="button"
            onClick={onDecrement}
            disabled={atMin || disabled}
            css={{
              ...base.large,
              paddingLeft: 4,
              paddingRight: 8,
              margin: 4,
              display: "flex",
              justifyContent: "center",
              ":focus": {
                outline: "none",
              },
              color: atMin || disabled ? colors.grey.lighter : colors.blue.base,
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <IconMinus
              css={{
                width: 10,
                height: 10,
                color:
                  disabled || atMin ? colors.grey.lighter : colors.blue.base,
              }}
            />
          </button>

          <input
            type="number"
            css={{
              ...base.large,
              textAlign: "center",
              border: "none",
              // 34 + the 2px on either side for border = 36 (the height of the standard input)
              height: 34,
              width: 36,
              ":focus": {
                outline: "none",
              },
              boxSizing: "content-box",
              backgroundColor: disabled ? colors.silver.light : colors.white,
              color: disabled ? colors.grey.lighter : colors.black.base,
            }}
            disabled={disabled}
            value={value}
            onChange={onInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {
            // the padding is different in the two buttons because the
            // type = number makes a small stepper appear, pushing the number over
          }
          <button
            type="button"
            onClick={onIncrement}
            disabled={atMax || disabled}
            css={{
              marginRight: 4,
              marginTop: 4,
              marginBottom: 4,
              paddingRight: 4,
              paddingLeft: 0,
              display: "flex",
              justifyContent: "center",
              ":focus": {
                outline: "none",
              },
              color: atMax || disabled ? colors.grey.lighter : colors.blue.base,
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <IconPlus
              css={{
                width: 10,
                height: 10,
                color:
                  disabled || atMax ? colors.grey.lighter : colors.blue.base,
              }}
            />
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};
Stepper.propTypes = {
  initialValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onLimitReached: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  description: PropTypes.element,
  size: PropTypes.oneOf(["small", "standard", "large"]),
  label: PropTypes.element,
  error: PropTypes.bool,
  helperText: PropTypes.element,
  helperIcon: PropTypes.element,
};
