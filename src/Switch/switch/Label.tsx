import React from "react";
import { ClassNames } from "@emotion/core";

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

/**
 * Label used by `Toggle`
 *
 * This can be used to emulate what a label would look like if it were used by a
 * `Toggle` in the even that you can't use the `Toggle`'s label.
 */
export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <label
          {...props}
          className={cx(
            css({
              alignItems: "center",
              display: "flex",
              fontWeight: 600,
            }),
            className
          )}
        >
          {children}
        </label>
      )}
    </ClassNames>
  );
};
