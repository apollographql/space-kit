/* eslint-disable @typescript-eslint/no-empty-interface */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { colors } from "../colors";
import { ListItem } from "../ListItem";

interface Props extends React.ComponentProps<typeof ListItem> {
  /**
   * Add a number as a right adornment. Usually used to express a count
   */
  count?: React.ReactNode;
}

/**
 * Heading intended to be used in a list. Can also be used to deliniate between
 * sections in a single list.
 *
 * Composed with and accepts all props of `ListItem`
 */
export const ListHeading = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<Props>
>(({ children, count, ...props }, ref) => {
  // Stop click events so we don't try to close the list when clicking something
  // non-interactive
  const handleClick = React.useCallback<NonNullable<typeof props.onClick>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      props.onClick?.(event);
    },
    [props.onClick]
  );

  return (
    <ListItem {...props} interactive={false} onClick={handleClick} ref={ref}>
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
    </ListItem>
  );
});
