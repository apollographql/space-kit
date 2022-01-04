/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

interface ButtonIconProps
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    "className"
  > {
  iconSize: number;
}

export const ButtonIcon = React.forwardRef<
  HTMLSpanElement,
  React.PropsWithChildren<ButtonIconProps>
>(({ children, className, iconSize }, ref) => {
  return (
    <span
      className={className}
      ref={ref}
      css={css({
        alignItems: "center",
        // This needs to be `inline-flex` and not the default of
        // `inline-block` to vertically center the icon automatically
        display: "inline-flex",
        height: iconSize,
        justifyContent: "center",
        // The `4px` will be on the right to separate the icon from the text
        width: iconSize,
      })}
    >
      {children}
    </span>
  );
});
