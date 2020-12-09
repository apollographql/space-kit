/* eslint-disable @typescript-eslint/no-empty-interface */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { colors } from "../colors";

/**
 * Divider between sections in a list
 */
export const ListDivider: React.FC = (props) => {
  // Stop click events so we don't try to close the list when clicking something
  // non-interactive
  const handleClick = React.useCallback<React.MouseEventHandler<HTMLHRElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  return (
    <hr
      {...props}
      onClick={handleClick}
      css={css({
        marginLeft: -8,
        marginRight: -8,
        marginTop: 8,
        marginBottom: 8,
        borderTopColor: colors.silver.base,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      })}
    />
  );
};
