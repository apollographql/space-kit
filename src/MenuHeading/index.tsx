/* eslint-disable @typescript-eslint/no-empty-interface */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { colors } from "../colors";
import { MenuItem } from "../MenuItem";

interface Props extends React.ComponentProps<typeof MenuItem> {
  /**
   * Add a number as a right adornment. Usually used to express a count
   */
  count?: React.ReactNode;
}

/**
 * Heading intended to be used in a menu. Can also be used to deliniate between
 * sections in a single menu.
 *
 * Composed with and accepts all props of `MenuItem`
 */
export const MenuHeading = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<Props>
>(({ children, count, ...props }, ref) => {
  return (
    <MenuItem {...props} interactive={false} ref={ref}>
      <h2
        css={css({
          display: "flex",
          fontSize: "inherit",
          fontWeight: 600,
          margin: 0,
          marginBottom: 2,
          marginTop: 3,
          textTransform: "uppercase",
          width: "100%",
        })}
        ref={ref}
      >
        <span css={css({ flex: "1" })}>{children}</span>
        {count && (
          <span
            css={css({
              color: colors.grey.light,
              flex: "none",
              fontWeight: "normal",
            })}
          >
            {count}
          </span>
        )}
      </h2>
    </MenuItem>
  );
});
